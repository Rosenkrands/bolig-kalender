using asp_net_core_project.Models.Dtos;

namespace asp_net_core_project.Models.Entities
{
    public interface IEntity<TId, out TDto> where TDto : IDto
    {
        TId Id { get; set; }
        TDto ToDto();
    }
}