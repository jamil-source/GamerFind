using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.DTO;
using Backend.Entities;
using Backend.Helpers;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUsername, string receiverUsername)
        {
            var messages = await _context.Messages
                            .Include(u => u.Sender).ThenInclude(p => p.Photos)
                            .Include(u => u.Receiver).ThenInclude(p => p.Photos)
                            .Where(message => message.Receiver.UserName == currentUsername 
                            && message.Sender.UserName == receiverUsername 
                            || message.Receiver.UserName == receiverUsername
                            && message.Sender.UserName == currentUsername
                            )
                            .OrderBy(message => message.MessageSent)
                            .ToListAsync();
            
            var unreadMessages = messages.Where(message => message.DateRead == null && message.Receiver.UserName == currentUsername).ToList();

            if(unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.Now;
                }

                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }

        public async Task<PagedList<MessageDTO>> GetUserMessages(MessageParams messageParams)
        {
            var query = _context.Messages
                .OrderByDescending(message => message.MessageSent)
                .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Receiver.UserName == messageParams.UserName),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.UserName),
                _ => query.Where(u => u.Receiver.UserName == messageParams.UserName && u.DateRead == null)
            };

            var messages = query.ProjectTo<MessageDTO>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDTO>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}