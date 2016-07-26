namespace WeightControl.Services
{
    [ServiceStack.Route("/weightsEdited")]
    [ServiceStack.Route("/weightsEdited/{WeightsEdited}")]
    public class WeightEditedRequest
    {
        public float WeightEdited { get; set; }
        public string Date { get; set; }
    }
}