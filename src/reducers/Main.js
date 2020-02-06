import { CHANGE_LANG } from '../const/Main'
import { SAVE_ANFRAGE } from '../const/Home'

import { getStatusBarHeight, getBottomSpace } from '../iphone_helper'

const top_space = getStatusBarHeight(true)
const bottom_space = getBottomSpace()

const INITIAL_STATE = {
  lang: 'de',

  top_space,
  bottom_space,

  data_anfrage: [],

  data_papers_scales: [
    { id: 1, code: "820419", dimensions: "62 mm x 50 m x 12 mm", suitable: "Mettler", color: "weiß / white", unit: "50" },
    { id: 2, code: "820421", dimensions: "62 mm x 50 m x 12 mm", suitable: "Mettler", color: "gelb / yellow", unit: "50" },
    { id: 3, code: "820420", dimensions: "62 mm x 50 m x 12 mm", suitable: "Mettler", color: "rot / rede", unit: "50" },
    { id: 4, code: "820422", dimensions: "62 mm x 50 m x 12 mm", suitable: "Mettler", color: "grün / green", unit: "50" },
    { id: 5, code: "820423", dimensions: "62 mm x 50 m x 12 mm", suitable: "Mettler", color: "blau / blue", unit: "50" },
    { id: 6, code: "820138", dimensions: "62 mm x 100 m x 12 mm", suitable: "Mettler", color: "weiß / white", unit: "27" },
    { id: 7, code: "820134", dimensions: "57 mm x 40 m x 12 mm (IW)", suitable: "Mettler", color: "weiß / white", unit: "50" },
    { id: 8, code: "820060", dimensions: "58 mm x 50 m x 12 mm", suitable: "Bizerba", color: "weiß / white", unit: "48" },
    { id: 9, code: "820407", dimensions: "58 mm x 50 m x 12 mm", suitable: "Bizerba", color: "weiß / white", unit: "50" },
    { id: 10, code: "820413", dimensions: "58 mm x 50 m x 12 mm", suitable: "Bizerba", color: "gelb / yellow", unit: "50" },
    { id: 11, code: "820410", dimensions: "58 mm x 50 m x 12 mm", suitable: "Bizerba", color: "rot / red", unit: "50" },
    { id: 12, code: "820414", dimensions: "58 mm x 50 m x 12 mm", suitable: "Bizerba", color: "grün / green", unit: "50" },
    { id: 13, code: "820411", dimensions: "58 mm x 50 m x 12 mm", suitable: "Bizerba", color: "blau / blue", unit: "50" },
    { id: 14, code: "820020", dimensions: "72 mm x 50 m x 12 mm", suitable: "Bizerba", color: "weiß / white", unit: "50" },
    { id: 15, code: "820268", dimensions: "57 mm x 50 m x 12 mm", suitable: "Berkel", color: "weiß / white", unit: "50" },
    { id: 16, code: "820041", dimensions: "60 mm x 50 m x 12 mm", suitable: "Berkel", color: "weiß / white", unit: "50" },
    { id: 17, code: "820241", dimensions: "60 mm x 100 m x 12 mm", suitable: "Berkel", color: "weiß / white", unit: "24" },
    { id: 18, code: "820086", dimensions: "51,5 mm x 100 m x 38,5 mm", suitable: "Berkel", color: "weiß / white", unit: "24" },
    { id: 19, code: "820001", dimensions: "51,5 mm x 60 m x 40 mm", suitable: "TEC", color: "weiß / white", unit: "45" },
    { id: 20, code: "820032", dimensions: "62 mm x Ø 58 mm x 12 mm", suitable: "Testut", color: "weiß / white", unit: "50" },
    { id: 21, code: "820404", dimensions: "57 mm x 25 m x 12 mm (IW)", suitable: "Testut", color: "weiß / white", unit: "50" },
    { id: 22, code: "820031", dimensions: "57 mm x 25 m x 12 mm (IW)", suitable: "Testut", color: "weiß / white", unit: "100" },
    { id: 23, code: "820286", dimensions: "58 mm x 50 m x 12 mm", suitable: "DIGI", color: "weiß / white", unit: "48" },
    { id: 24, code: "820121", dimensions: "50 mm x 200 m x 12 mm (IW)", suitable: "DIGI", color: "weiß / white", unit: "20" },
    { id: 25, code: "820132", dimensions: "60 mm x 105 m x 38,5 mm", suitable: "DIGI", color: "weiß / white", unit: "15" },
    { id: 26, code: "820125", dimensions: "42 mm x 50 m x 12 mm", suitable: "YAMATO", color: "weiß / white", unit: "50" },
    { id: 27, code: "820122", dimensions: "42 mm x 100 m x 12 mm", suitable: "YAMATO", color: "weiß / white", unit: "36" },
    { id: 28, code: "820191", dimensions: "62 mm x Ø 58 mm x 12 mm", suitable: "HELMAC", color: "weiß / white", unit: "50" },
    { id: 29, code: "820181", dimensions: "62 mm x 50 m x 12 mm", suitable: "HELMAC", color: "weiß / white", unit: "50" },
    { id: 30, code: "820432", dimensions: "62 mm x Ø 80 mm x 17,5 mm", suitable: "HELMAC", color: "weiß / white", unit: "60" },
    { id: 31, code: "820033", dimensions: "60 mm x 25 m x 12 mm", suitable: "METO", color: "weiß / white", unit: "100" },
    { id: 32, code: "820037", dimensions: "62 mm x 25 m x 12 mm", suitable: "OMEGA", color: "weiß / white", unit: "100" },
    { id: 33, code: "820111", dimensions: "60 mm x Ø 55 mm x 12 mm", suitable: "EPELSA", color: "weiß / white", unit: "50" },
    { id: 34, code: "820116", dimensions: "58 mm x 40 m x 12 mm", suitable: "GRAEF/ DATALINE", color: "weiß / white", unit: "50" },
    { id: 35, code: "820298", dimensions: "58 mm x 45 m x 12 mm", suitable: "	TALIANA-MACCHI", color: "weiß / white", unit: "50" },
    { id: 36, code: "820035", dimensions: "58 mm x 35 m x 12 mm", suitable: "DIBAL", color: "weiß / white", unit: "50" },
    { id: 37, code: "820141", dimensions: "60 mm x ˇ 60 mm x 12 mm (IW)", suitable: "DIBAL", color: "weiß / white", unit: "50" },
  ],
  data_papers_registers: [
    { id: 1, code: "820119", dimensions: "57 mm x 10 m x 12 mm, blanko", suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 2, code: "821154", dimensions: `57 mm x 10 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 3, code: "821165", dimensions: "57 mm x 12 m x 12 mm", suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 4, code: "820187", dimensions: `57 mm x 12 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 5, code: "821083", dimensions: "57 mm x 15 m x 12 mm", suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 6, code: "820943", dimensions: `57 mm x 15 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 7, code: "820335", dimensions: "57 mm x 18 m x 12 mm", suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 8, code: "821459", dimensions: `57 mm x 18 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 9, code: "820306", dimensions: `57 mm x 25 m x 12 mm, blanko`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 10, code: "820248", dimensions: `57 mm x 25 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "10" },
    { id: 11, code: "820008", dimensions: `57 mm x 25 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 12, code: "820408", dimensions: `57 mm x 50 m x 12 mm, blanko`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 13, code: "820009", dimensions: `57 mm x 50 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EC-Cash", color: "weiß / white", unit: "50" },
    { id: 14, code: "820154", dimensions: `80 mm x 80 m x 12 mm, 0/1-farbig "Lastschrift" (SEPA)`, suitable: "EPSON", color: "weiß / white", unit: "50" },
    { id: 15, code: "820991", dimensions: `80 mm x 80 m x 12 mm, 0/1-farbig "Bewirtungs-nachweis"`, suitable: "EPSON", color: "weiß / white", unit: "30" },
    { id: 16, code: "820092", dimensions: "80 mm x 50 m x 12 mm", suitable: "EPSON", color: "weiß / white", unit: "50" },
    { id: 17, code: "820239", dimensions: "80 mm x 50 m x 12 mm (wârmebestândig)", suitable: "EPSON", color: "weiß / white", unit: "50" },
    { id: 18, code: "820227", dimensions: "80 mm x 50 m x 12 mm", suitable: "EPSON", color: "rot / red", unit: "50" },
    { id: 19, code: "820215", dimensions: "80 mm x 70 m x 12 mm", suitable: "EPSON", color: "weiß / white", unit: "50" },
    { id: 20, code: "820416", dimensions: "80 mm x 80 m x 12 mm", suitable: "EPSON", color: "weiß / white", unit: "30" },
    { id: 21, code: "820415", dimensions: "80 mm x 80 m x 12 mm", suitable: "EPSON", color: "weiß / white", unit: "40" },
    { id: 22, code: "820097", dimensions: "80 mm x 80 m x 12 mm", suitable: "EPSON", color: "weiß / white", unit: "50" },
    { id: 23, code: "820409", dimensions: "57 mm x 50 m x 12 mm", suitable: "SHARP", color: "weiß / white", unit: "50" },
    { id: 24, code: "820153", dimensions: "57,5 mm x 50 m x 17,5 mm (70 gr.)", suitable: "SHARP", color: "weiß / white", unit: "50" },
    { id: 25, code: "820135", dimensions: "57 mm x Ø 80 mm x 17,5 mm", suitable: "SHARP", color: "weiß / white", unit: "50" },
    { id: 26, code: "820136", dimensions: "57 mm x 80 m x 12 mm", suitable: "SHARP", color: "weiß / white", unit: "50" },
    { id: 27, code: "820242", dimensions: "80 mm x 40 m x 12 mm", suitable: "SHARP", color: "weiß / white", unit: "50" },
    { id: 28, code: "820250", dimensions: "57,5 mm x 50 m x 17,5 mm (70 gr.)", suitable: "CASIO", color: "weiß / white", unit: "50" },
    { id: 29, code: "820145", dimensions: "60 mm x 70 m x 12 mm", suitable: "CASIO", color: "weiß / white", unit: "60" },
    { id: 30, code: "820049", dimensions: "60 mm x Ø 80 mm x 18,4 mm", suitable: "CASIO", color: "weiß / white", unit: "50" },
    { id: 31, code: "820120", dimensions: "58 mm x 35 m x 12 mm", suitable: "NORIS-XT", color: "weiß / white", unit: "50" },
    { id: 32, code: "820127", dimensions: "112 mm x Ø 50 mm x 12 mm", suitable: "PANASONIC", color: "weiß / white", unit: "50" },
    { id: 33, code: "820606", dimensions: "57 mm x 200 m x 25 mm", suitable: "TOMRA", color: "weiß / white", unit: "50" },
    { id: 34, code: "820321", dimensions: "58 mm x 50 m x 12 mm", suitable: "", color: "weiß / white", unit: "12" },
    { id: 35, code: "820320", dimensions: "60 mm x 50 m x 12 mm", suitable: "", color: "weiß / white", unit: "50" },
    { id: 36, code: "820319", dimensions: "80 mm x 50 m x 12 mm", suitable: "", color: "weiß / white", unit: "50" },
    { id: 37, code: "820931", dimensions: "80 mm x 80 m x 12 mm", suitable: "", color: "weiß / white", unit: "50" },
    { id: 38, code: "820302", dimensions: "57,5 mm x  26 m x 12 mm", suitable: "", color: "weiß / white", unit: "50" },
  ],
  data_papers_wood: [
    { id: 1, code: "830039", dimensions: "27 mm x Ø 70 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 2, code: "830006", dimensions: "44 mm x Ø 70 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 3, code: "830007", dimensions: "44 mm x Ø 70 mm x 17,5 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 4, code: "830008", dimensions: "44 mm x Ø 80 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 5, code: "830001", dimensions: "44 mm x Ø 80 mm x 17,5 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 6, code: "830040", dimensions: "57 mm x Ø 50 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 7, code: "830003", dimensions: "57 mm x 40 m x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 8, code: "830024", dimensions: "57 mm x Ø 70 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 9, code: "830025", dimensions: "58 mm x Ø 70 mm x 17,5 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 10, code: "830017", dimensions: "70 mm x 40 m x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 11, code: "830020", dimensions: "70 mm x Ø 70 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 12, code: "830018", dimensions: "70 mm x 50 m x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
    { id: 13, code: "830047", dimensions: "76 mm x Ø 80 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
    { id: 14, code: "830063", dimensions: "76 mm x Ø 60 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 15, code: "830021", dimensions: "76 mm x 40 m x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
    { id: 16, code: "830012", dimensions: "76 mm x 40 m x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 17, code: "830019", dimensions: "76 mm x Ø 70 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 18, code: "830050", dimensions: "76 mm x Ø 70 mm x 17,5 mm", suitable: "none", color: "weiß / white", unit: "100" },
    { id: 19, code: "830048", dimensions: "76 mm x Ø 80 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
    { id: 20, code: "830027", dimensions: "114 mm x Ø 60 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
    { id: 21, code: "830033", dimensions: "114 mm x Ø 80 mm x 12 mm", suitable: "none", color: "weiß / white", unit: "30" },
    { id: 22, code: "830119", dimensions: "70 mm x 50 m x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
    { id: 23, code: "830120", dimensions: "70 mm x 50 m x 12 mm", suitable: "none", color: "weiß / white", unit: "50" },
  ],
  data_papers_fax: [
    { id: 1, code: "810173", dimensions: "210 mm x 15 m x 12 mm", suitable: "none", color: "none", unit: "6" },
    { id: 2, code: "810021", dimensions: "210 mm x 30 m x 12 mm", suitable: "none", color: "none", unit: "6" },
    { id: 3, code: "810174", dimensions: "216 mm x 15 m x 12 mm", suitable: "none", color: "none", unit: "6" },
    { id: 4, code: "810070", dimensions: "216 mm x 30 m x 12 mm", suitable: "none", color: "none", unit: "6" },
  ],
  data_papers_rolls: [
    { id: 1, code: "830090", quality: "CB/CF", dimensions: "44 mm x 25 m x 12 mm", suitable: "none", color: "w/w / w/w", unit: "50" },
    { id: 2, code: "830092", quality: "CB/CF", dimensions: "57 mm x 20 m x 12 mm", suitable: "none", color: "w/g / w/y", unit: "100" },
    { id: 3, code: "830011", quality: "CB/CF", dimensions: "57 mm x 25 m x 12 mm", suitable: "none", color: "w/g / w/y", unit: "50" },
    { id: 4, code: "830091", quality: "CB/CF", dimensions: "57 mm x 25 m x 12 mm", suitable: "none", color: "w/g / w/y", unit: "50" },
    { id: 5, code: "830057", quality: "CB/CF", dimensions: "70 mm x 25 m x 12 mm", suitable: "none", color: "w/w / w/w", unit: "50" },
    { id: 6, code: "830056", quality: "CB/CF", dimensions: "76 mm x 25 m x 12 mm", suitable: "none", color: "w/w / w/w", unit: "50" },
  ],
  data_papers_labels: [
    { id: 1, code: "880115", dimensions: "58 mm x 65 m x 40 mm", suitable: "none", color: "weiß / white", unit: "30" },
    { id: 2, code: "880258", dimensions: "58 mm x 100 m x 40 mm", suitable: "none", color: "weiß / white", unit: "18" },
  ],
  data_papers_thermal: [
    { id: 1, code: "880005", dimensions: `46,8 mm x 43 mm, 2-fabig "Standarddruck"`, suitable: "Mettler", roll: "1250", unit: "24" },
    { id: 2, code: "880006", dimensions: `46,8 mm x 62 mm, 2-fabig "Standarddruck"`, suitable: "Mettler", roll: "850", unit: "24" },
    { id: 3, code: "880007", dimensions: `46,8 mm x 81 mm, 2-fabig "Standarddruck"`, suitable: "Mettler", roll: "650", unit: "24" },
    { id: 4, code: "880008", dimensions: `46,8 mm x 102 mm, 2-fabig "Standarddruck"`, suitable: "Mettler", roll: "500", unit: "24" },
    { id: 5, code: "880019", dimensions: "58 mm x 43 mm, blanko", suitable: "Bizerba", roll: "1040", unit: "20" },
    { id: 6, code: "880015", dimensions: "58 mm x 60 mm, blanko", suitable: "Bizerba/Dibal", roll: "700", unit: "24" },
    { id: 7, code: "880026", dimensions: "58 mm x 60 mm, blanko", suitable: "Bizerba", roll: "850", unit: "24" },
    { id: 8, code: "880174", dimensions: "68 mm x 45 mm, blanko", suitable: "Bizerba", roll: "1000", unit: "30" },
    { id: 9, code: "880001", dimensions: "49 mm x 40 mm, blanko", suitable: "Berkel", roll: "1000", unit: "20" },
    { id: 10, code: "880002", dimensions: "49 mm x 62 mm, blanko", suitable: "Berkel", roll: "650", unit: "20" },
    { id: 11, code: "880003", dimensions: "49 mm x 81 mm, blanko", suitable: "Berkel", roll: "500", unit: "20" },
    { id: 12, code: "880052", dimensions: "58 mm x 58 mm, blanko", suitable: "Berkel", roll: "500", unit: "20" },
    { id: 13, code: "880053", dimensions: "58 mm x 76 mm, blanko", suitable: "Berkel", roll: "400", unit: "20" },
  ],
};

const Main = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CHANGE_LANG:
      return {
        ...state,
        lang: action.lang
      }
    case SAVE_ANFRAGE:
      return {
        ...state,
        data_anfrage: action.data
      }
    default:
      return state;
  }
}

export default Main;
