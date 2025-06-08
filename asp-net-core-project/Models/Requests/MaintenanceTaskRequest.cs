namespace asp_net_core_project.Models.Requests;

public class MaintenanceTaskRequest
{
    public required string Title { get; set; }
    public string? Description { get; set; }

    // Tags for which housing types this task applies to (can be both)
    public List<string> HousingTypes { get; set; } = [];

    // The months (1-12) this task is relevant for
    public List<int> RelevantMonths { get; set; } = [];
}