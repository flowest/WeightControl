namespace WeightControl.Services
{
    [ServiceStack.Route("/editWeight")]
    [ServiceStack.Route("/editWeight/{newWeight}")]
    public class EditWeightRequest
    {
        public float WeightInput { get; set; }
        public string Date { get; set; }
    }
}