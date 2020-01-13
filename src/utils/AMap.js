export default function MapLoader() {
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap);
        } else {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src =
                "https://webapi.amap.com/maps?v=1.4.5&key=4b5f2cf2cba25200cc6b68c398468899&&plugin=AMap.ToolBar,AMap.Driving,AMap.Autocomplete,AMap.PlaceSearch";
            script.onerror = reject;
            document.head.appendChild(script);
        }
        window.initAMap = () => {
            resolve(window.AMap);
        };
    });
}