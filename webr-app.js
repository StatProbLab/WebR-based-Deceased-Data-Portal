

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("validate-btn").addEventListener("click", validateCSV);
    document.getElementById("process-btn").addEventListener("click", processCSV);
});

function validateCSV() {
    // Call the validation function in your JavaScript file
    
}
// async function plottR(webR, plot_code = "plot(mtcars, col='blue')",
//                         width = 400, height = 400, 
//                             id = "base-canvas") {

//   const webRCodeShelter = await new webR.Shelter();

//   await webR.evalRVoid(`canvas(width=${width}, height=${height})`);

//   const result = await webRCodeShelter.captureR(`${plot_code}`, {
//     withAutoprint: true,
//     captureStreams: true,
//     captureConditions: false,
//     env: webR.objs.emptyEnv,
//   });

//   await webR.evalRVoid("dev.off()");

//   const msgs = await webR.flush();

//   const canvas = document.getElementById(id)
//   canvas.setAttribute("width", 2 * width);
//   canvas.setAttribute("height", 2 * height);

//   msgs.forEach(msg => {
//     if (msg.type === "canvasExec") Function(`this.getContext("2d").${msg.data}`).bind(canvas)()
//   });

// }
 

async function processCSV() {

    import('https://webr.r-wasm.org/latest/webr.mjs').then(
        async ({ WebR }) => {
        const webR = new WebR();
        
        await webR.installPackages(['tidyverse'])
        await webR.init();
        
        // plottR(webR)

        let alertMsg = document.getElementById("alert-messages");
        let plotArea = document.getElementById("plot-container");
   
        let shelter = await new webR.Shelter();
        let result = await shelter.captureR("demo(graphics)");

        // console.log('Output obtained from running `rnorm` from webR:')
        // console.log(result.images[0]);
        result.images.forEach((img) => {
            const canvas = document.createElement("canvas");
            canvas.width = 350;
            canvas.height = 350;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, 350, 350);
            document.getElementById("plot-container").appendChild(canvas);
          });
        shelter.purge();
        // for(i=0;i<=10;i++){
        //     plotArea.innerHTML += result.output[i].data + '<br>';
        // }
        
});
}
// import the webr module and then run the code

