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
                    "~/Scripts/Lib/bootstrap.js",
                    "~/Scripts/Lib/angular-1.2.0-rc.2/angular.js",
                    "~/Scripts/Lib/ui-bootstrap-0.6.0/ui-bootstrap-{version}.js",
                    "~/Scripts/Lib/underscore/underscore.js",
                    "~/Scripts/Lib/ng-grid-{version}.js"
                );

            var jsApp = new Bundle("~/js", new JsMinify())
                .Include(
                    "~/Scripts/App.js",
                    "~/Scripts/Controllers.js",
                    "~/Scripts/Services.js");

            bundles.Add(jsLibs);
            bundles.Add(jsApp);

            var css = new Bundle("~/css")
                .Include(
                    "~/Content/ng-grid.css",
                    "~/Content/bootstrap/bootstrap.css",
                    "~/Content/main.css",
                    "~/Content/bootstrap/bootstrap-theme.css");
            bundles.Add(css);
        }
    }
}