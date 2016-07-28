namespace WeightControl.Services
{
    [ServiceStack.Route("/weightInput")]
    [ServiceStack.Route("/weightInput/{WeightInput}")]
    public class WeightInputRequest
    {
        public float WeightInput { get; set; }
        public string Date { get; set; }
    }
}