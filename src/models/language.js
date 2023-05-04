import { languageOptions, dictionaryList } from '../languages'

export const language = {
    name: "language",
    state: {
        userLanguage: 'en',
        dictionary: dictionaryList.en
    },
    reducers: {
        userLanguageChange: (state, selected) => {
            const newLanguage = languageOptions[selected] ? selected : 'en'
            state.userLanguage = newLanguage
            state.dictionary=dictionaryList[newLanguage]
        }
    }
}