using System;
using System.Linq;
using ServiceStack;
using WeightControl.Services;

namespace WeightControl
{
    public class MyServices : Service
    {

        WeightControlClassesDataContext context = new WeightControlClassesDataContext();

        public object Any(CheckForWeightsRequest checkForWeights)
        {
            int year = Int32.Parse(checkForWeights.Date.Split('-')[0]);
            int month = Int32.Parse(checkForWeights.Date.Split('-')[1]);
            int day = Int32.Parse(checkForWeights.Date.Split('-')[2]);

            double weight = 0;

            using (context)
            {
                weight = context.Weights.Where(entry => entry.Id == new DateTime(year, month, day)).ToList().First().BodyWeight;
            }

            return weight;
        }

        public object Any(WeightEditedRequest weightEdited)
        {
            int year = Int32.Parse(weightEdited.Date.Split('-')[0]);
            int month =Int32.Parse(weightEdited.Date.Split('-')[1]);
            int day =  Int32.Parse(weightEdited.Date.Split('-')[2]);


            Weight weight = new Weight
            {
                Id = new DateTime(year, month, day),
                BodyWeight = weightEdited.WeightEdited
            };

            using (context)
            {

                context.Weights.InsertOnSubmit(weight);
                context.SubmitChanges();
            }

            return null;
        }
    }
}