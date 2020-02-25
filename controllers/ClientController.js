const Option = require("../models/Option");

module.exports = {
    getHome: async function (req, res, next) {
        try {
            let option = await Option.findOne({ where: { key: "video_home" }, });
            let object = {
                video_intro: "",
                video_design_service: "",
                video_furni_service: "",
            }
            if (option) {
                object = option.value;
            }
            res.json(object)
        } catch (error) {
            res.errorException(error);
        }
    },

}