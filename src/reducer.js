const defaultState = {
  homeArticles: [],
  currentUser: null,
  currentStock: '',
  stockInfo: {
    currentStock: '',
    company: {},
    article: {},
    financials: {},
    logo: {}
  },
  portfolio: null,
  date: [],
  data: [],
  title: ''
}


function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_HOME_ARTICLES":
      return {...state, homeArticles: action.payload}
    case "SET_DATE":
      return {...state, date: action.payload}
    case "SET_DATA":
      return {...state, data: action.payload}
    case "SET_TITLE":
      return {...state, title: action.payload}
    case "SELECT_STOCK":
      return {...state, currentStock: action.payload}
    case "BUY_STOCK":
      return {...state, currentUser: action.payload }
    case "SET_ARTICLE":
      return {...state, currentArticle: action.payload }
    case "SET_CURRENT_STOCK":
      return { ...state, stockInfo: {...state.stockInfo, currentStock: action.payload} }
    case "SET_COMPANY_INFO":
      return { ...state, stockInfo: {...state.stockInfo, company: action.payload} }
    case "SET_ARTICLE_INFO":
      return {  ...state, stockInfo: {...state.stockInfo, article: action.payload} }
    case "SET_LOGO":
      return {  ...state, stockInfo: {...state.stockInfo, logo: action.payload} }
    case "SET_FINANCIALS":
      return { ...state, stockInfo: {...state.stockInfo, financials: action.payload}}
    case "SET_PORTFOLIO":
      return { ...state, portfolio: action.payload}
    default:
      return state
  }
}

export default reducer
