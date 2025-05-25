using Microsoft.AspNetCore.Identity;

namespace asp_net_core_project.Data
{
    public class ApplicationUser : IdentityUser
    {
        // Additional properties can be added here if needed
        // For example, you might want to add a profile picture URL or other user-specific data

        // Example:
        // [ public string? ProfilePictureUrl { get; set; } ]

        // Override the ToString method if you want to customize how the user is represented as a string
        public override string ToString()
        {
            return $"{Email}";
        }
    }
}