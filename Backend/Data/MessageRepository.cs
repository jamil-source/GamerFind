using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Entities;
using Backend.Helpers;
using Backend.Interfaces;

namespace Backend.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        public MessageRepository(DataContext context)
        {
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

        public Task<IEnumerable<MessageDTO>> GetMessageThread(int currentUserId, int receiverId)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<MessageDTO>> GetUserMessages()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}