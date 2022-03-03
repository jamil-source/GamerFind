using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.DTO;
using Backend.Entities;
using Backend.Extensions;
using Backend.Helpers;
using Backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;
        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            _mapper = mapper;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<MessageDTO>> CreateMessage(CreateMessageDTO createMessageDTO)
        {
            var username = User.GetUsername();

            if(username == createMessageDTO.ReceiverUsername.ToLower())
            {
                return BadRequest("Message can not be send to yourself!");
            }

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var receiver = await _userRepository.GetUserByUsernameAsync(createMessageDTO.ReceiverUsername);

            if(receiver == null)
            {
                return NotFound();
            }

            var message = new Message
            {
                Sender = sender,
                Receiver = receiver,
                SenderUsername = sender.UserName,
                ReceiverUsername = receiver.UserName,
                Content = createMessageDTO.Content
            };

            _messageRepository.AddMessage(message);

            if(await _messageRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<MessageDTO>(message));
            }

            return BadRequest("Message could not send!");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetUserMessages([FromQuery] MessageParams messageParams)
        {
            messageParams.UserName = User.GetUsername();

            var messages = await _messageRepository.GetUserMessages(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }

        [Authorize]
        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _messageRepository.GetMessageThread(currentUsername, username));
        }

    }
}