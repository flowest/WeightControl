using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using ServiceStack;
using WeightControl.Services;

namespace WeightControl
{
    [ServiceStack.Route("/getAllWeights")]
    [ServiceStack.Route("/getAllWeights/{Month}")]
    public class GetAllWeightsRequest
    {
        public int Month { get; set; }
    }

    public class GetAllWeightsResponse
    {
        public Dictionary<string, double> Weights { get; set; }
    }

    public class MyServices : Service
    {
        readonly WeightControlClassesDataContext context = new WeightControlClassesDataContext();

        public CheckForWeightsResponse Any(CheckForWeightsRequest checkForWeights)
        {
            int year = Int32.Parse(checkForWeights.Date.Split('-')[0]);
            int month = Int32.Parse(checkForWeights.Date.Split('-')[1]);
            int day = Int32.Parse(checkForWeights.Date.Split('-')[2]);

            double weight = 0;

            using (context)
            {
                weight = context.Weights.Where(entry => entry.Id == new DateTime(year, month, day)).ToList().First().BodyWeight;
            }

            return new CheckForWeightsResponse
            {
                Weight = (float)weight
            };
        }

        public object Any(WeightInputRequest weightInput)
        {
            int year = Int32.Parse(weightInput.Date.Split('-')[0]);
            int month = Int32.Parse(weightInput.Date.Split('-')[1]);
            int day = Int32.Parse(weightInput.Date.Split('-')[2]);


            Weight weight = new Weight
            {
                Id = new DateTime(year, month, day),
                BodyWeight = weightInput.WeightInput
            };

            using (context)
            {
                context.Weights.InsertOnSubmit(weight);
                context.SubmitChanges();
            }

            return null;
        }

        public EditWeightResponse Any(EditWeightRequest newWeight)
        {
            int year = Int32.Parse(newWeight.Date.Split('-')[0]);
            int month = Int32.Parse(newWeight.Date.Split('-')[1]);
            int day = Int32.Parse(newWeight.Date.Split('-')[2]);

            using (context)
            {
                context.Weights.Where(entry => entry.Id == new DateTime(year, month, day)).ToList().First().BodyWeight = newWeight.WeightInput;
                context.SubmitChanges();
            }

            return new EditWeightResponse
            {
                Weight = newWeight.WeightInput
            };
        }

        public GetAllWeightsResponse Any(GetAllWeightsRequest request)
        {
            GetAllWeightsResponse response = new GetAllWeightsResponse
            {
                Weights = new Dictionary<string, double>()
            };

            using (context)
            {
                Table<Weight> weights = context.Weights;

                foreach (var weight in weights)
                {
                    string dateString = weight.Id.Year.ToString() + '-' + weight.Id.Month + '-' + weight.Id.Day;
                    response.Weights.Add(dateString, weight.BodyWeight);
                }
            }

            return response;

        }

    }
}