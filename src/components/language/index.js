import { useSelector } from 'react-redux'

// get text according to id & current language
export function Translate({ tid }) {
//   const languageContext = useContext(LanguageContext)
  let dictionary = useSelector(state => state.language.dictionary)
  //console.log(dictionary)
  return dictionary[tid] || tid
}
