using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Funq;
using ServiceStack;
using ServiceStack.Mvc;

namespace WeightControl
{
    public class AppHost : AppHostBase
    {
        public AppHost() : base("MVC 4", typeof(MyServices).Assembly) { }

        public override void Configure(Container container)
        {
            SetConfig(new HostConfig
            {
                HandlerFactoryPath = "api"
            });

            ControllerBuilder.Current.SetControllerFactory(
                new FunqControllerFactory(container));
        }
    }

    [ServiceStack.Route("/hello/{Name}")]
    public class HelloRequest
    {
        public string Name { get; set; }
    }

    [ServiceStack.Route("/jochen/{Name}")]
    public class JochenRequest
    {
        public string Name { get; set; }
    }

    public class MyServices : Service
    {
        public object Any(HelloRequest request)
        {
            return request;
        }

        public object Any(JochenRequest jochen)
        {
            return jochen;
        }
    }
}