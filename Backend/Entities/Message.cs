using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public User Sender { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverUsername { get; set; }
        public User Receiver { get; set; }
        public string Content { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public DateTime? DateRead { get; set; }
        public bool SenderDeleted { get; set; }
        public bool ReceiverDeleted { get; set; }

    }
}