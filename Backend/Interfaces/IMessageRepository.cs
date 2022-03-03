using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Entities;
using Backend.Helpers;

namespace Backend.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDTO>> GetUserMessages();
        Task<IEnumerable<MessageDTO>> GetMessageThread(int currentUserId, int receiverId);
        Task<bool> SaveAllAsync();

    }
}