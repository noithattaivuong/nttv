module.exports = {
    getHome: async function (req, res, next) {
        try {
            var object={};
            object.video_intro="https://redirector.googlevideo.com/videoplayback?expire=1581862138&ei=2jBJXu-HAo-C1wKsh6W4Bw&ip=2a01:4f8:c2c:4227::1&id=0c026385d61cba4a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=m&mvi=2&pl=37&sc=yes&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=1430.790&lmt=1581851973663406&mt=1581854903&sparams=expire,ei,ip,id,itag,source,requiressl,susc,app,mime,cnr,dur,lmt&sig=ALgxI2wwRAIgPwcI0z8Yvtvchhx75-tvsRmimF8-BmgOmwCFbPrAMcECIGBV675ys73u0pdYhKtRHnE5CgIRZ8BHO5Nhjz-rgol1&lsparams=mm,mn,ms,mv,mvi,pl,sc&lsig=AHylml4wRAIgB5vCNFDmokrECJxil6_KwjA_flWomsMiIuAGU86qg-UCIGsqMPypJjLB4vRt2Zy-FyNkVuHf1ESYvWOc8SMkmOSr";
            object.video_design_service="https://redirector.googlevideo.com/videoplayback?expire=1581862138&ei=2jBJXu-HAo-C1wKsh6W4Bw&ip=2a01:4f8:c2c:4227::1&id=0c026385d61cba4a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=m&mvi=2&pl=37&sc=yes&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=1430.790&lmt=1581851973663406&mt=1581854903&sparams=expire,ei,ip,id,itag,source,requiressl,susc,app,mime,cnr,dur,lmt&sig=ALgxI2wwRAIgPwcI0z8Yvtvchhx75-tvsRmimF8-BmgOmwCFbPrAMcECIGBV675ys73u0pdYhKtRHnE5CgIRZ8BHO5Nhjz-rgol1&lsparams=mm,mn,ms,mv,mvi,pl,sc&lsig=AHylml4wRAIgB5vCNFDmokrECJxil6_KwjA_flWomsMiIuAGU86qg-UCIGsqMPypJjLB4vRt2Zy-FyNkVuHf1ESYvWOc8SMkmOSr";
            object.video_furni_service="https://redirector.googlevideo.com/videoplayback?expire=1581862138&ei=2jBJXu-HAo-C1wKsh6W4Bw&ip=2a01:4f8:c2c:4227::1&id=0c026385d61cba4a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=m&mvi=2&pl=37&sc=yes&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=1430.790&lmt=1581851973663406&mt=1581854903&sparams=expire,ei,ip,id,itag,source,requiressl,susc,app,mime,cnr,dur,lmt&sig=ALgxI2wwRAIgPwcI0z8Yvtvchhx75-tvsRmimF8-BmgOmwCFbPrAMcECIGBV675ys73u0pdYhKtRHnE5CgIRZ8BHO5Nhjz-rgol1&lsparams=mm,mn,ms,mv,mvi,pl,sc&lsig=AHylml4wRAIgB5vCNFDmokrECJxil6_KwjA_flWomsMiIuAGU86qg-UCIGsqMPypJjLB4vRt2Zy-FyNkVuHf1ESYvWOc8SMkmOSr";
            res.json(object)
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    
}