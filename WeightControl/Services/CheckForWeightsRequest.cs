using System;

namespace WeightControl.Services
{
    [ServiceStack.Route("/checkForWeight/{Date}")]
    public class CheckForWeightsRequest
    {
        public string Date { get; set; }
    }
}