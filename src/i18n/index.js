import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./zh";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            zh: {
                translation: zh
            }
            // en: {
            //     translation: en
            // },
            // nl: {
            //     translation: nl
            // }
        },
        lng: "zh",
        fallbackLng: "zh",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    })

export default i18n;