using System.Web.Optimization;

namespace Diablo3Farmer.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            var jsLibs = new Bundle("~/js/lib")
                .Include(
                    "~/Scripts/Lib/jquery-{version}.js",
                    "~/Scripts/Lib/angular.js",
                    "~/Scripts/Lib/ng-grid-{version}.js"
                );

            var jsApp = new Bundle("~/js", new JsMinify())
                .Include(
                    "~/Scripts/App.js",
                    "~/Scripts/Controllers.js",
                    "~/Scripts/Services.js");

            bundles.Add(jsLibs);
            bundles.Add(jsApp);

            bundles
                .Add(
                    new Bundle("~/css")
                        .Include("~/Content/ng-grid.css", "~/Content/main.css"));
        }
    }
}