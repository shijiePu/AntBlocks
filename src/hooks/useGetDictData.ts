import { keys } from 'lodash-es';
import { useContext, useMemo } from 'react';

import { ConfigContext } from '../components/config-provider';

interface UseGetDictType {
  dictKey: string | undefined;
  dict?: Record<string, string>;
}

const DICT = {
  "personCheckRepeatStatus": {
      "pass": "不重复",
      "not_pass": "重复"
  },
  "transAbility": {
      "strong": "A. 转化能力强，≥5项 (25-30分)",
      "better": "B. 转化能力较强， ≥4项 (19-24分))",
      "normal": "C. 转化能力一般，≥3项 (13-18分)",
      "lower": "D. 转化能力较弱， ≥2项 (7-12分)",
      "low": "E. 转化能力弱，≥1项 (1-6分)",
      "none": "F. 转化能力无，0项 (0分)"
  },
  "techAdvancedLevel_none": {
      "0": "0"
  },
  "meetingStatus": {
      "dealing": "进行中",
      "waiting": "待开始",
      "finish": "完成评审",
      "expired": "超期未评审"
  },
  "domainClassify": {
      "disciplineField": "学科领域",
      "naturalScienceFoundationField": "国家自然科学基金领域",
      "industrialTechnologyField": "产业技术领域"
  },
  "auditResultStatus": {
      "PASSED": "通过",
      "RETURNED": "不通过"
  },
  "messageType": {
      "zcwjcx": "政策文件",
      "tzggcx": "通知公告"
  },
  "enterRegisterType_200": {
      "210": "合资经营企业（港或澳、台资）",
      "220": "合作经营企业（港或澳、台资）",
      "230": "港、澳、台商独资经营企业",
      "240": "港、澳、台商投资股份有限公司",
      "290": "其他港、澳、台商投资企业"
  },
  "projectFundInPlaceType": {
      "budget_fund": "预算总额",
      "reached_fund": "已到位数"
  },
  "process_type_submit": {
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      "ADD_BIND_UNIT": "新增绑定单位",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门"
  },
  "techAdvancedLevel_normal": {
      "4": "4",
      "3": "3"
  },
  "intelPropertyNum": {
      "high": "A.1项及以上（Ⅰ类）（7-8分）",
      "higher": "B.5项及以上（Ⅱ类）（5-6分）",
      "normal": "C.3~4项（Ⅲ类）（3-4分）",
      "lower": "D.1~2项（Ⅳ类）（1-2分）",
      "none": "E.0项（0分）"
  },
  "intelPropertyNum_normal": {
      "4": "4",
      "3": "3"
  },
  "TechnologyReport": {
      "1": "最终报告",
      "2": "进展报告",
      "3": "专题报告",
      "4": "中期报告",
      "5": "立项报告",
      "6": "年度报告",
      "7": "其他"
  },
  "intellectualType": {
      "001": "实用新型专利",
      "002": "外观设计专利",
      "003": "软件著作权",
      "004": "发明专利（非国防专利）",
      "005": "发明专利（国防专利）",
      "006": "植物新品种",
      "007": "国家级农作物品种",
      "008": "国家新药",
      "009": "国家一级中药保护品种",
      "010": "集成电路布图设计专有权",
      "011": "其他"
  },
  "nationality": {
      "China": "中国大陆",
      "Hong Kong(Special Administrative Region of China)": "中国香港",
      "Macao(Special Administrative Region of China)": "中国澳门",
      "Taiwan Province of China": "中国台湾省",
      "Albania": "阿尔巴尼亚",
      "United Arab Emirates (the)": "阿联酋",
      "Argentina": "阿根廷",
      "Afghanistan": "阿富汗",
      "Algeria": "阿尔及利亚",
      "Aruba": "阿鲁巴",
      "Oman": "阿曼",
      "Azerbaijan": "阿塞拜疆",
      "Egypt": "埃及",
      "Ethiopia": "埃塞俄比亚",
      "Ireland": "爱尔兰",
      "Estonia": "爱沙尼亚",
      "Andorra": "安道尔",
      "Angola": "安哥拉",
      "Anguilla": "安圭拉岛(英)",
      "Antigua and Barbuda": "安提瓜和巴布达",
      "Austria": "奥地利",
      "Aland Islands": "奥兰群岛(芬兰自治省)",
      "Australia": "澳大利亚",
      "Barbados": "巴巴多斯",
      "Papua New Guinea": "巴布亚新几内亚",
      "Bahamas (the)": "巴哈马",
      "Pakistan": "巴基斯坦",
      "Paraguay": "巴拉圭",
      "Palestine State of": "巴勒斯坦国",
      "Bahrain": "巴林",
      "Panama": "巴拿马",
      "Brazil": "巴西",
      "Belarus": "白俄罗斯",
      "Bermuda": "百慕大",
      "Bulgaria": "保加利亚",
      "Northern Mariana Islands (the)": "北马里亚纳群岛",
      "North Macedonia": "北马其顿",
      "Benin": "贝宁",
      "Belgium": "比利时",
      "Iceland": "冰岛",
      "Puerto Rico": "波多黎各",
      "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
      "Poland": "波兰",
      "Bolivia(Plurinational State of)": "玻利维亚",
      "Belize": "伯利兹",
      "Bonaire Sint Eustatius and Saba": "博奈尔岛、圣尤斯特歇斯岛和萨巴岛",
      "Botswana": "博茨瓦纳",
      "Bhutan": "不丹",
      "Burkina Faso": "布基纳法索",
      "Burundi": "布隆迪",
      "Bouvet Island": "布韦岛",
      "Korea(the Democratic People's Republic of)": "朝鲜",
      "Equatorial Guinea": "赤道几内亚",
      "Denmark": "丹麦",
      "Germany": "德国",
      "Timor-Leste": "东帝汶",
      "Togo": "多哥",
      "Dominican Republic(the)": "多米尼加",
      "Dominica": "多米尼克",
      "Russian Federation(the)": "俄罗斯",
      "Ecuador": "厄瓜多尔",
      "Eritrea": "厄立特里亚",
      "France": "法国",
      "Faroe Islands(the)": "法罗群岛",
      "French Polynesia": "法属波利尼西亚",
      "French Guiana": "法属圭亚那",
      "French Southern Territories (the)": "法属南部领地",
      "Holy See(the)[Vatican City State]": "梵蒂冈",
      "Philippines(the)": "菲律宾",
      "Fiji": "斐济",
      "Finland": "芬兰",
      "Cape Verde": "佛得角",
      "Falkland Islands (the) [Malvinas]": "福克兰群岛(又称马尔维纳斯群岛)",
      "Gambia (the)": "冈比亚",
      "Congo": "刚果(布)",
      "Congo(the Democratic Republic of the)": "刚果(金)",
      "Colombia": "哥伦比亚",
      "Costa Rica": "哥斯达黎加",
      "Grenada": "格林纳达",
      "Greenland": "格陵兰",
      "Georgia": "格鲁吉亚",
      "Guernsey": "根西岛",
      "Cuba": "古巴",
      "Guadeloupe": "瓜德罗普",
      "Guam": "关岛",
      "Guyana": "圭亚那",
      "Kazakhstan": "哈萨克斯坦",
      "Haiti": "海地",
      "Korea(the Republic of)": "韩国",
      "Netherlands(the)": "荷兰",
      "Heard Island and McDonald Islands": "赫德岛和麦克唐纳群岛",
      "Montenegro": "黑山",
      "Honduras": "洪都拉斯",
      "Kiribati": "基里巴斯",
      "Djibouti": "吉布提",
      "Kyrgyzstan": "吉尔吉斯斯坦",
      "Guinea": "几内亚",
      "Guinea-Bissau": "几内亚比绍",
      "Canada": "加拿大",
      "Ghana": "加纳",
      "Gabon": "加蓬",
      "Cambodia": "柬埔寨",
      "Czechia": "捷克",
      "Zimbabwe": "津巴布韦",
      "Cameroon": "喀麦隆",
      "Qatar": "卡塔尔",
      "Cayman Islands (the)": "开曼群岛",
      "Cocos (Keeling) Islands": "科科斯(基灵)群岛",
      "Comoros": "科摩罗",
      "Cote d'Ivoire": "科特迪瓦",
      "Kuwait": "科威特",
      "Croatia": "克罗地亚",
      "Kenya": "肯尼亚",
      "Cook Islands(the)": "库克群岛",
      "Curacao": "库拉索",
      "Latvia": "拉脱维亚",
      "Lesotho": "莱索托",
      "Lao People's Democratic Republic(the)": "老挝",
      "Lebanon": "黎巴嫩",
      "Lithuania": "立陶宛",
      "Liberia": "利比里亚",
      "Libya": "利比亚",
      "Liechtenstein": "列支敦士登",
      "Réunion": "留尼汪",
      "Luxembourg": "卢森堡",
      "Rwanda": "卢旺达",
      "Romania": "罗马尼亚",
      "Madagascar": "马达加斯加",
      "Isle of Man": "马恩岛",
      "Maldives": "马尔代夫",
      "Malta": "马耳他",
      "Malawi": "马拉维",
      "Malaysia": "马来西亚",
      "Mali": "马里",
      "Marshall Islands(the)": "马绍尔群岛",
      "Martinique": "马提尼克",
      "Mayotte": "马约特",
      "Mauritius": "毛里求斯",
      "Mauritania": "毛里塔尼亚",
      "United States of America(the)": "美国",
      "United States Minor Outlying Islands (the)": "美国本土外小岛屿",
      "American Samoa": "美属萨摩亚",
      "Virgin Islands(U.S.)": "美属维尔京群岛",
      "Mongolia": "蒙古国",
      "Montserrat": "蒙特塞拉特",
      "Bangladesh": "孟加拉国",
      "Peru": "秘鲁",
      "Micronesia(the Federated States of)": "密克罗尼西亚",
      "Myanmar": "缅甸",
      "Moldova (the Republic of)": "摩尔多瓦",
      "Morocco": "摩洛哥",
      "Monaco": "摩纳哥",
      "Mozambique": "莫桑比克",
      "Mexico": "墨西哥",
      "Namibia": "纳米比亚",
      "South Africa": "南非",
      "Antarctica": "南极洲",
      "South Georgia and the South Sandwich Islands": "南乔治亚岛和南桑威奇群岛",
      "South Sudan": "南苏丹",
      "Nauru": "瑙鲁",
      "Nepal": "尼泊尔",
      "Nicaragua": "尼加拉瓜",
      "Niger(the)": "尼日尔",
      "Nigeria": "尼日利亚",
      "Niue": "纽埃",
      "Norway": "挪威",
      "Norfolk Island": "诺福克岛",
      "Palau": "帕劳",
      "Pitcairn": "皮特凯恩岛",
      "Portugal": "葡萄牙",
      "Japan": "日本",
      "Sweden": "瑞典",
      "Switzerland": "瑞士",
      "El Salvador": "萨尔瓦多",
      "Samoa": "萨摩亚",
      "Serbia": "塞尔维亚",
      "Sierra Leone": "塞拉利昂",
      "Senegal": "塞内加尔",
      "Cyprus": "塞浦路斯",
      "Seychelles": "塞舌尔",
      "Saudi Arabia": "沙特阿拉伯",
      "Saint Barthélemy": "圣巴泰勒米",
      "Christmas Island": "圣诞岛",
      "Sao Tome and Principe": "圣多美和普林西比",
      "Saint Helena Ascension and Tristan daCunha": "圣赫勒拿-阿森松-特里斯坦-达库尼亚",
      "Saint Kitts and Nevis": "圣基茨和尼维斯",
      "Saint Lucia": "圣卢西亚",
      "Saint Martin(French Part)": "圣马丁(法属)",
      "Saint Martin(Dutch Part)": "圣马丁(荷兰属 )",
      "San Marino": "圣马力诺",
      "Saint Pierre and Miquelon": "圣皮埃尔和密克隆",
      "Saint Vincent and the Grenadines": "圣文森特和格林纳丁斯",
      "Sri Lanka": "斯里兰卡",
      "Slovakia": "斯洛伐克",
      "Slovenia": "斯洛文尼亚",
      "Svalbard and Jan Mayen": "斯瓦尔巴和扬马延",
      "Eswatini": "斯威士兰",
      "Sudan(the)": "苏丹",
      "Suriname": "苏里南",
      "Solomon Islands": "所罗门群岛",
      "Somalia": "索马里",
      "Tajikistan": "塔吉克斯坦",
      "Thailand": "泰国",
      "Tanzania the United Republic of": "坦桑尼亚",
      "Tonga": "汤加",
      "Turks and Caicos Islands (the)": "特克斯和凯科斯群岛",
      "Trinidad and Tobago": "特立尼达和多巴哥",
      "Tunisia": "突尼斯",
      "Tuvalu": "图瓦卢",
      "Turkey": "土耳其",
      "Turkmenistan": "土库曼斯坦",
      "Tokelau": "托克劳",
      "Wallis and Futuna": "瓦利斯和富图纳",
      "Vanuatu": "瓦努阿图",
      "Guatemala": "危地马拉",
      "Venezuela(Bolivarian Republic of)": "委内瑞拉玻利瓦尔共和国",
      "Brunei Darussalam": "文莱",
      "Uganda": "乌干达",
      "Ukraine": "乌克兰",
      "Uruguay": "乌拉圭",
      "Uzbekistan": "乌兹别克斯坦",
      "Spain": "西班牙",
      "Western Sahara": "西撒哈拉",
      "Greece": "希腊",
      "Singapore": "新加坡",
      "New Caledonia": "新喀里多尼亚",
      "New Zealand": "新西兰",
      "Hungary": "匈牙利",
      "Syrian Arab Republic(the)": "叙利亚",
      "Jamaica": "牙买加",
      "Armenia": "亚美尼亚",
      "Yemen": "也门",
      "Iraq": "伊拉克",
      "Iran (Islamic Republic of)": "伊朗",
      "Israel": "以色列",
      "Italy": "意大利",
      "India": "印度",
      "Indonesia": "印度尼西亚",
      "United Kingdom of Great Britain and Northern Ireland (the)": "英国",
      "Virgin Islands(British)": "英属维尔京群岛",
      "British Indian Ocean Territory (the)": "英属印度洋领地",
      "Jordan": "约旦",
      "Viet Nam": "越南",
      "Zambia": "赞比亚",
      "Jersey": "泽西岛",
      "Chad": "乍得",
      "Gibraltar": "直布罗陀",
      "Chile": "智利",
      "Central African Republic(the)": "中非共和国"
  },
  "autoGroupBasis": {
      "industrialTechnologyField": "产业领域",
      "naturalScienceFoundationField": "国家自然科学基金领域",
      "disciplineField": "学科领域",
      "guideCode": "指南代码",
      "projectType": "申报代码"
  },
  "expertLevel": {
      "A": "A类",
      "B": "B类",
      "C": "C类"
  },
  "reviewType_out": {
      "PROCESS_OUTBOUND": "主动出库",
      "PROCESS_PASSIVE_OUTBOUND": "被动出库"
  },
  "awardType": {
      "BSC": "科学技术突出贡献奖",
      "NSP": "自然科学奖",
      "STP": "科技进步奖",
      "YSC": "青年科技杰出贡献奖",
      "ISC": "国际科学技术合作奖"
  },
  "nomineeDisciplineField_L_L1": {
      "L1_1": "作物育种",
      "L1_2": "农业生物工程",
      "L1_3": "作物栽培",
      "L1_4": "土壤与肥料",
      "L1_5": "植物保护",
      "L1_6": "农业设施与机械装备",
      "L1_7": "食品加工及其副产品和利用",
      "L1_8": "食品安全"
  },
  "reviewResult": {
      "intended_identification": "拟认定",
      "to_be_re_evaluated": "待重评",
      "not_passed": "不通过"
  },
  "nomineeDisciplineField_L_L2": {
      "L2_1": "林木育种",
      "L2_2": "经济林",
      "L2_3": "园艺",
      "L2_4": "蔬菜",
      "L2_5": "果树"
  },
  "companyWay": {
      "companyWayC": "合作委托",
      "companyWayB": "直接投资新设",
      "companyWayA": "收并购"
  },
  "positionLevel_nationalLevel": {
      "nationalLevel#1": "国家级公共创新平台负责人",
      "nationalLevel#2": "国家级公共创新平台技术骨干或高级管理人员",
      "nationalLevel#3": "国家级行业协会负责人",
      "nationalLevel#4": "国家级产业技术创新战略联盟负责人",
      "nationalLevel#5": "国家级高新区、科技园区、创新创业载体负责人",
      "nationalLevel#6": "其他"
  },
  "positionLevel_provincialLevel": {
      "provincialLevel#1": "省级公共创新平台负责人",
      "provincialLevel#2": "省级公共创新平台技术骨干或高级管理人员",
      "provincialLevel#3": "省级行业协会负责人",
      "provincialLevel#4": "省级产业技术创新战略联盟负责人",
      "provincialLevel#5": "省产业链专家",
      "provincialLevel#6": "省级高新区、科技园区、创新创业载体负责人",
      "provincialLevel#7": "其他"
  },
  "participateProjectLevel_prov": {
      "prov#1": "省部级科学技术奖评审专家",
      "prov#2": "其他省部级项目评审专家"
  },
  "unitType": {
      "government_functional_department": "政府职能部门",
      "scientific_research_institution": "科研机构",
      "educational_institution": "教育机构",
      "enterprise": "企业",
      "medical_treatment": "医疗机构"
  },
  "nominateMethod": {
      "union": "联合提名",
      "independence": "独立提名"
  },
  "academician": {
      "CAS": "中国科学院院士",
      "CAE": "中国工程院院士",
      "CAES": "两院院士"
  },
  "enterRegisterType_300": {
      "310": "中外合资经营企业",
      "320": "中外合作经营企业",
      "330": "外资企业",
      "340": "外商投资股份有限公司",
      "390": "其他外商投资企业"
  },
  "process_type_compentent_opt": {
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门"
  },
  "overseasCountries": {
      "Hong Kong(Special Administrative Region of China)": "中国香港",
      "Macao(Special Administrative Region of China)": "中国澳门",
      "Taiwan Province of China": "中国台湾省",
      "Algeria": "阿尔及利亚",
      "Albania": "阿尔巴尼亚",
      "United Arab Emirates (the)": "阿联酋",
      "Argentina": "阿根廷",
      "Afghanistan": "阿富汗",
      "Aruba": "阿鲁巴",
      "Oman": "阿曼",
      "Azerbaijan": "阿塞拜疆",
      "Egypt": "埃及",
      "Ethiopia": "埃塞俄比亚",
      "Ireland": "爱尔兰",
      "Estonia": "爱沙尼亚",
      "Andorra": "安道尔",
      "Angola": "安哥拉",
      "Anguilla": "安圭拉岛(英)",
      "Antigua and Barbuda": "安提瓜和巴布达",
      "Austria": "奥地利",
      "Aland Islands": "奥兰群岛(芬兰自治省)",
      "Australia": "澳大利亚",
      "Barbados": "巴巴多斯",
      "Papua New Guinea": "巴布亚新几内亚",
      "Bahamas (the)": "巴哈马",
      "Pakistan": "巴基斯坦",
      "Paraguay": "巴拉圭",
      "Palestine State of": "巴勒斯坦国",
      "Bahrain": "巴林",
      "Panama": "巴拿马",
      "Brazil": "巴西",
      "Belarus": "白俄罗斯",
      "Bermuda": "百慕大",
      "Bulgaria": "保加利亚",
      "Northern Mariana Islands (the)": "北马里亚纳群岛",
      "North Macedonia": "北马其顿",
      "Benin": "贝宁",
      "Belgium": "比利时",
      "Iceland": "冰岛",
      "Puerto Rico": "波多黎各",
      "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
      "Poland": "波兰",
      "Bolivia(Plurinational State of)": "玻利维亚",
      "Belize": "伯利兹",
      "Bonaire Sint Eustatius and Saba": "博奈尔岛、圣尤斯特歇斯岛和萨巴岛",
      "Botswana": "博茨瓦纳",
      "Bhutan": "不丹",
      "Burkina Faso": "布基纳法索",
      "Burundi": "布隆迪",
      "Bouvet Island": "布韦岛",
      "Korea(the Democratic People's Republic of)": "朝鲜",
      "Equatorial Guinea": "赤道几内亚",
      "Denmark": "丹麦",
      "Germany": "德国",
      "Timor-Leste": "东帝汶",
      "Togo": "多哥",
      "Dominican Republic(the)": "多米尼加",
      "Dominica": "多米尼克",
      "Russian Federation(the)": "俄罗斯",
      "Ecuador": "厄瓜多尔",
      "Eritrea": "厄立特里亚",
      "France": "法国",
      "Faroe Islands(the)": "法罗群岛",
      "French Polynesia": "法属波利尼西亚",
      "French Guiana": "法属圭亚那",
      "French Southern Territories (the)": "法属南部领地",
      "Holy See(the)[Vatican City State]": "梵蒂冈",
      "Philippines(the)": "菲律宾",
      "Fiji": "斐济",
      "Finland": "芬兰",
      "Cape Verde": "佛得角",
      "Falkland Islands (the) [Malvinas]": "福克兰群岛(又称马尔维纳斯群岛)",
      "Gambia (the)": "冈比亚",
      "Congo": "刚果(布)",
      "Congo(the Democratic Republic of the)": "刚果(金)",
      "Colombia": "哥伦比亚",
      "Costa Rica": "哥斯达黎加",
      "Grenada": "格林纳达",
      "Greenland": "格陵兰",
      "Georgia": "格鲁吉亚",
      "Guernsey": "根西岛",
      "Cuba": "古巴",
      "Guadeloupe": "瓜德罗普",
      "Guam": "关岛",
      "Guyana": "圭亚那",
      "Kazakhstan": "哈萨克斯坦",
      "Haiti": "海地",
      "Korea(the Republic of)": "韩国",
      "Netherlands(the)": "荷兰",
      "Heard Island and McDonald Islands": "赫德岛和麦克唐纳群岛",
      "Montenegro": "黑山",
      "Honduras": "洪都拉斯",
      "Kiribati": "基里巴斯",
      "Djibouti": "吉布提",
      "Kyrgyzstan": "吉尔吉斯斯坦",
      "Guinea": "几内亚",
      "Guinea-Bissau": "几内亚比绍",
      "Canada": "加拿大",
      "Ghana": "加纳",
      "Gabon": "加蓬",
      "Cambodia": "柬埔寨",
      "Czechia": "捷克",
      "Zimbabwe": "津巴布韦",
      "Cameroon": "喀麦隆",
      "Qatar": "卡塔尔",
      "Cayman Islands (the)": "开曼群岛",
      "Cocos (Keeling) Islands": "科科斯(基灵)群岛",
      "Comoros": "科摩罗",
      "Cote d'Ivoire": "科特迪瓦",
      "Kuwait": "科威特",
      "Croatia": "克罗地亚",
      "Kenya": "肯尼亚",
      "Cook Islands(the)": "库克群岛",
      "Curacao": "库拉索",
      "Latvia": "拉脱维亚",
      "Lesotho": "莱索托",
      "Lao People's Democratic Republic(the)": "老挝",
      "Lebanon": "黎巴嫩",
      "Lithuania": "立陶宛",
      "Liberia": "利比里亚",
      "Libya": "利比亚",
      "Liechtenstein": "列支敦士登",
      "Réunion": "留尼汪",
      "Luxembourg": "卢森堡",
      "Rwanda": "卢旺达",
      "Romania": "罗马尼亚",
      "Madagascar": "马达加斯加",
      "Isle of Man": "马恩岛",
      "Maldives": "马尔代夫",
      "Malta": "马耳他",
      "Malawi": "马拉维",
      "Malaysia": "马来西亚",
      "Mali": "马里",
      "Marshall Islands(the)": "马绍尔群岛",
      "Martinique": "马提尼克",
      "Mayotte": "马约特",
      "Mauritius": "毛里求斯",
      "Mauritania": "毛里塔尼亚",
      "United States of America(the)": "美国",
      "United States Minor Outlying Islands (the)": "美国本土外小岛屿",
      "American Samoa": "美属萨摩亚",
      "Virgin Islands(U.S.)": "美属维尔京群岛",
      "Mongolia": "蒙古国",
      "Montserrat": "蒙特塞拉特",
      "Bangladesh": "孟加拉国",
      "Peru": "秘鲁",
      "Micronesia(the Federated States of)": "密克罗尼西亚",
      "Myanmar": "缅甸",
      "Moldova (the Republic of)": "摩尔多瓦",
      "Morocco": "摩洛哥",
      "Monaco": "摩纳哥",
      "Mozambique": "莫桑比克",
      "Mexico": "墨西哥",
      "Namibia": "纳米比亚",
      "South Africa": "南非",
      "Antarctica": "南极洲",
      "South Georgia and the South Sandwich Islands": "南乔治亚岛和南桑威奇群岛",
      "South Sudan": "南苏丹",
      "Nauru": "瑙鲁",
      "Nepal": "尼泊尔",
      "Nicaragua": "尼加拉瓜",
      "Niger(the)": "尼日尔",
      "Nigeria": "尼日利亚",
      "Niue": "纽埃",
      "Norway": "挪威",
      "Norfolk Island": "诺福克岛",
      "Palau": "帕劳",
      "Pitcairn": "皮特凯恩岛",
      "Portugal": "葡萄牙",
      "Japan": "日本",
      "Sweden": "瑞典",
      "Switzerland": "瑞士",
      "El Salvador": "萨尔瓦多",
      "Samoa": "萨摩亚",
      "Serbia": "塞尔维亚",
      "Sierra Leone": "塞拉利昂",
      "Senegal": "塞内加尔",
      "Cyprus": "塞浦路斯",
      "Seychelles": "塞舌尔",
      "Saudi Arabia": "沙特阿拉伯",
      "Saint Barthélemy": "圣巴泰勒米",
      "Christmas Island": "圣诞岛",
      "Sao Tome and Principe": "圣多美和普林西比",
      "Saint Helena Ascension and Tristan daCunha": "圣赫勒拿-阿森松-特里斯坦-达库尼亚",
      "Saint Kitts and Nevis": "圣基茨和尼维斯",
      "Saint Lucia": "圣卢西亚",
      "Saint Martin(French Part)": "圣马丁(法属)",
      "Saint Martin(Dutch Part)": "圣马丁(荷兰属 )",
      "San Marino": "圣马力诺",
      "Saint Pierre and Miquelon": "圣皮埃尔和密克隆",
      "Saint Vincent and the Grenadines": "圣文森特和格林纳丁斯",
      "Sri Lanka": "斯里兰卡",
      "Slovakia": "斯洛伐克",
      "Slovenia": "斯洛文尼亚",
      "Svalbard and Jan Mayen": "斯瓦尔巴和扬马延",
      "Eswatini": "斯威士兰",
      "Sudan(the)": "苏丹",
      "Suriname": "苏里南",
      "Solomon Islands": "所罗门群岛",
      "Somalia": "索马里",
      "Tajikistan": "塔吉克斯坦",
      "Thailand": "泰国",
      "Tanzania the United Republic of": "坦桑尼亚",
      "Tonga": "汤加",
      "Turks and Caicos Islands (the)": "特克斯和凯科斯群岛",
      "Trinidad and Tobago": "特立尼达和多巴哥",
      "Tunisia": "突尼斯",
      "Tuvalu": "图瓦卢",
      "Turkey": "土耳其",
      "Turkmenistan": "土库曼斯坦",
      "Tokelau": "托克劳",
      "Wallis and Futuna": "瓦利斯和富图纳",
      "Vanuatu": "瓦努阿图",
      "Guatemala": "危地马拉",
      "Venezuela(Bolivarian Republic of)": "委内瑞拉玻利瓦尔共和国",
      "Brunei Darussalam": "文莱",
      "Uganda": "乌干达",
      "Ukraine": "乌克兰",
      "Uruguay": "乌拉圭",
      "Uzbekistan": "乌兹别克斯坦",
      "Spain": "西班牙",
      "Western Sahara": "西撒哈拉",
      "Greece": "希腊",
      "Singapore": "新加坡",
      "New Caledonia": "新喀里多尼亚",
      "New Zealand": "新西兰",
      "Hungary": "匈牙利",
      "Syrian Arab Republic(the)": "叙利亚",
      "Jamaica": "牙买加",
      "Armenia": "亚美尼亚",
      "Yemen": "也门",
      "Iraq": "伊拉克",
      "Iran (Islamic Republic of)": "伊朗",
      "Israel": "以色列",
      "Italy": "意大利",
      "India": "印度",
      "Indonesia": "印度尼西亚",
      "United Kingdom of Great Britain and Northern Ireland (the)": "英国",
      "Virgin Islands(British)": "英属维尔京群岛",
      "British Indian Ocean Territory (the)": "英属印度洋领地",
      "Jordan": "约旦",
      "Viet Nam": "越南",
      "Zambia": "赞比亚",
      "Jersey": "泽西岛",
      "Chad": "乍得",
      "Gibraltar": "直布罗陀",
      "Chile": "智利",
      "Central African Republic(the)": "中非共和国"
  },
  "submitStatus": {
      "to_be_submit": "待提交",
      "submitted": "已提交",
      "not_pass": "不通过",
      "pass": "通过"
  },
  "awardExpertType": {
      "awardExpertTypeA": "国家最高科学技术奖获奖人",
      "awardExpertTypeb": "省科学技术突出贡献奖获奖人",
      "awardExpertTypeC": "院士",
      "awardExpertTypeD": "国家自然科学奖、技术发明奖、科学技术进步奖获奖项目第一完成人",
      "awardExpertTypeE": "江苏省科学技术一等奖获奖项目第一完成人"
  },
  "keyUniversityType": {
      "3": "其他",
      "2": "“211”高校",
      "1": "“985”高校"
  },
  "nomineeDisciplineField_D_D4": {
      "D4_1": "外科手术治疗",
      "D4_2": "内镜下治疗",
      "D4_3": "介入治疗",
      "D4_4": "普通药物治疗",
      "D4_5": "靶向治疗",
      "D4_6": "化学治疗",
      "D4_7": "放射治疗",
      "D4_8": "抗感染与免疫调节治疗",
      "D4_9": "心理与精神治疗"
  },
  "nomineeDisciplineField_D_D3": {
      "D3_1": "症状诊断学",
      "D3_2": "物理诊断学",
      "D3_3": "机能诊断学",
      "D3_4": "医学影像学",
      "D3_5": "临床放射学",
      "D3_6": "实验诊断学"
  },
  "sex": {
      "male": "男性",
      "female": "女性"
  },
  "planFund_planFundC": {
      "planFundC1": "江苏省基础研究计划（江苏省自然科学基金）",
      "planFundC2": "江苏省科技成果转化专项",
      "planFundC3": "江苏省重点研发计划",
      "planFundC4": "江苏省创新能力建设计划",
      "planFundC5": "政策引导类计划"
  },
  "titleType_other": {
      "other other": "其他职称"
  },
  "ruleLink": {
      "base_rule": "基础规则",
      "limit_rule": "限项规则",
      "formality_review": "形式审查",
      "apply_province_limit": "申请省拨经费上限",
      "industry_technology_setting": "产业技术领域设置",
      "guide_category_setting": "指南代码配置",
      "repeat_review": "重复审查",
      "message_limit": "短信限制时间",
      "expert_rule": "专家规则",
      "expert_selection_rule": "专家遴选规则"
  },
  "planFund_planFundA": {
      "planFundA1": "国家科技支撑计划",
      "planFundA2": "863计划",
      "planFundA3": "973计划",
      "planFundA4": "科技基础条件平台建设计划",
      "planFundA5": "国家自然科学基金",
      "planFundA6": "国家重大专项",
      "planFundA7": "国家重点研发计划",
      "planFundA8": "技术创新引导专项",
      "planFundA9": "基地和人才专项"
  },
  "intelPropertyNum_none": {
      "0": "0"
  },
  "nomineeDisciplineField_D_D2": {
      "D2_1": "分子生物学",
      "D2_2": "生物化学",
      "D2_3": "生理学",
      "D2_4": "营养学",
      "D2_5": "药理学",
      "D2_6": "药效学",
      "D2_7": "药代动力学",
      "D2_8": "药物毒理学",
      "D2_9": "药物实验动物学",
      "D2_10": "药物统计学"
  },
  "nomineeDisciplineField_D_D1": {
      "D1_1": "人体生理学",
      "D1_2": "病理生理学",
      "D1_3": "免疫病理学",
      "D1_4": "病理解剖学",
      "D1_5": "系统病理学",
      "D1_6": "环境病理学",
      "D1_7": "分子病理学",
      "D1_8": "实验病理学"
  },
  "nomineeDisciplineField_L_L3": {
      "L3_1": "动物育种与繁育",
      "L3_2": "动物营养与饲料加工",
      "L3_3": "兽医学",
      "L3_4": "畜禽养殖",
      "L3_5": "水产品种选育与增殖、贮藏与加工",
      "L3_6": "水产饲料与病害防治"
  },
  "rewardLevelOne": {
      "first_prize": "一等奖"
  },
  "ipType": {
      "invention": "发明",
      "utilityModel": "实用新型",
      "appearancePatent": "外观专利",
      "csCopyright": "计算机软件著作权",
      "designRights": "集成电路布图设计权",
      "varietyRights": "植物新品种权",
      "paper": "论文",
      "other": "其他"
  },
  "highStayHighLevel": {
      "bachelor": "学士",
      "master": "硕士",
      "doctor": "博士",
      "other": "其他"
  },
  "belongSystem": {
      "1": "科技计划",
      "2": "高新技术企业认定",
      "3": "科学技术奖励",
      "4": "科技咨询专家库",
      "5": "高企专家库"
  },
  "projectAndTopic": {
      "only_project": "项目",
      "project_and_topic": "课题"
  },
  "expertStatus": {
      "D": "可出席",
      "A": "未邀请",
      "B": "待反馈",
      "C": "已拒绝"
  },
  "repetitiveReviewType": {
      "contrast_this_year": "与当年申报项目对比",
      "contrast_last_year": "与往年申报项目对比"
  },
  "reviewNodeName": {
      "地方科技部门审核": "地方科技部门审核"
  },
  "rewardLevelTwo": {
      "first_prize": "一等奖",
      "second_prize": "二等奖"
  },
  "enterpriseReviewResult": {
      "recommend": "已推荐",
      "not_recommend": "不推荐"
  },
  "projectLink_check": {
      "formality_review": "形式审查",
      "repetitive_review": "重复性审查"
  },
  "flowRevieStatusNew": {
      "TODO": "待提交",
      "AUDIT": "待审核",
      "PASSED": "通过",
      "RETURNED": "不通过",
      "RECALL": "已撤回"
  },
  "unionResult": {
      "A": "推荐",
      "B": "备选"
  },
  "nominateType": {
      "unit": "单位提名",
      "expert": "专家提名"
  },
  "emergingIndustriesClassification": {
      "artificial_intelligence": "人工智能",
      "quantum_information": "量子信息",
      "blockchain_and_big_data": "区块链与大数据",
      "third_generation_semiconductor": "第三代半导体",
      "future_network_communication": "未来网络通信",
      "next_generation_internet_of_things": "下一代物联网",
      "advanced_carbon_materials": "先进碳材料",
      "nano_new_materials": "纳米新材料",
      "intelligent_manufacturing": "智能制造",
      "aerospace_and_deep_se": "航空航天与深海深地",
      "other": "其他"
  },
  "unitNatureNew": {
      "medical_treatment": "医疗机构",
      "enterprise": "企业",
      "technology_intermediary_agencies": "科技中介机构",
      "provincial_universities": "省属高校",
      "affiliated_universities": "部属高校",
      "provincial_research_institutions": "省属科研机构",
      "city_and_county_research_institutions": "市县科研机构",
      "subordinate_research_institutions": "部属科研机构",
      "administrative_institutions": "行政事业机构",
      "other": "其他"
  },
  "aiRepetitiveStatus": {
      "to_be_pushed": "待推送",
      "repeat_reviewing": "查重中",
      "completed": "已完成"
  },
  "highStayEducationType": {
      "abroad": "国外",
      "domestic": "国内"
  },
  "smsApplyStatus": {
      "D": "超时",
      "C": "拒绝",
      "B": "出席",
      "A": "待确认"
  },
  "reminderStatus": {
      "to_be_reminded": "待提醒",
      "reminded": "已提醒"
  },
  "categoryRuleType": {
      "project_type": "项目类型",
      "report_code": "申报代码"
  },
  "party": {
      "GCD": "中国共产党",
      "KMT": "中国国民党革命委员会",
      "CDL": "中国民主同盟会",
      "CDCA": "中国民主建国会",
      "CDPA": "中国民主促进会",
      "CADP": "中国农工民主党",
      "CZGP": "中国致公党",
      "JS": "九三学社",
      "TDSL": "台湾民主自治同盟",
      "OTHER": "其它"
  },
  "recommendStatus": {
      "notRecommended": "未推荐",
      "recommended": "已推荐"
  },
  "process_type_enterprise": {
      "enterprise_declare": "企业申报",
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门",
      "ADD_BIND_UNIT": "新增绑定单位",
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门"
  },
  "clerkCheckStatus": {
      "wait": "待复核",
      "pass": "通过",
      "not_pass": "不通过"
  },
  "isEnterpriseCoProduces_YES": {
      "2": "2",
      "1": "1"
  },
  "nomineeDisciplineField": {
      "A": "数学、物理与天文学",
      "B": "化学与材料科学",
      "C": "生物学与生态学",
      "D": "基础医学与药学",
      "E": "电子信息及系统科学",
      "F": "生物技术与医药",
      "G": "能源与节能",
      "H": "材料与化学工程",
      "I": "先进制造与重大装备",
      "J": "资源与环境",
      "K": "建筑、水利与交通",
      "L": "农业与林业",
      "M": "医疗卫生"
  },
  "baseRecommendScaleWay": {
      "recommend_rate": "设置推荐比例",
      "recommend_num": "设置推荐个数"
  },
  "mainBusiness": {
      "main_business_001": "高端装备",
      "main_business_002": "集成电路",
      "main_business_003": "新能源",
      "main_business_004": "新材料",
      "main_business_005": "生物医药",
      "main_business_006": "新能源汽车",
      "main_business_007": "新型电力装备",
      "main_business_008": "节能环保",
      "main_business_009": "软件与信息服务",
      "main_business_010": "物联网",
      "main_business_011": "新一代信息通信",
      "main_business_012": "高技术船舶和海工装备",
      "main_business_013": "航空航天",
      "main_business_014": "冶金",
      "main_business_015": "化工",
      "main_business_016": "高端纺织",
      "main_business_017": "绿色食品",
      "main_business_018": "新型建材",
      "main_business_019": "现代农业",
      "main_business_020": "第三代半导体",
      "main_business_021": "人工智能",
      "main_business_022": "类脑智能",
      "main_business_023": "量子科技",
      "main_business_024": "氢能和储能",
      "main_business_025": "深空深海深地开发",
      "main_business_026": "合成生物",
      "main_business_027": "基因技术及细胞治疗",
      "main_business_028": "未来网络",
      "main_business_029": "先进计算",
      "main_business_030": "元宇宙"
  },
  "title": {
      "primary": "初级",
      "middle": "中级",
      "assistantSenior": "副高",
      "senior": "正高",
      "other": "其他"
  },
  "ruleType_review": {
      "expert_rules": "专家规则",
      "project_rules": "项目规则"
  },
  "awardExportType": {
      "all": "导出全部",
      "completed": "导出完成单位",
      "intellectualProperty": "导出主要知识产权",
      "satTaskSource": "导出任务来源",
      "completedPerson": "导出完成人",
      "promoteAppSituation": "导出近两年直接经济效益"
  },
  "company": {
      "001": "中审众环会计师事务所（特殊普通合伙）江苏分所",
      "002": "公证天业会计师事务所（特殊普通合伙）南京分所",
      "003": "中兴华会计师事务所（特殊普通合伙）江苏分所",
      "004": "江苏苏港会计师事务所有限公司",
      "005": "苏亚金诚会计师事务所",
      "006": "天衡会计师事务所（特殊普通合伙）",
      "007": "江苏天宏华信会计师事务所有限公司",
      "008": "信永中和会计师事务所（特殊普通合伙）南京分所",
      "009": "江苏经纬会计师事务所有限公司",
      "010": "众华会计师事务所（特殊普通合伙）江苏分所",
      "011": "江苏国瑞会计师事务所有限公司",
      "012": "无锡东林会计师事务所有限公司",
      "013": "江苏方正会计师事务所有限公司",
      "014": "南通万隆会计师事务所（普通合伙）",
      "015": "江苏金达信会计师事务所有限公司",
      "016": "扬州弘瑞会计师事务所有限公司",
      "017": "江苏苏税迅通会计师事务所有限公司",
      "018": "天职国际会计师事务所（特殊普通合伙）江苏分所",
      "019": "江苏中正同仁会计师事务所有限公司",
      "020": "江苏永和会计师事务所有限公司",
      "021": "南京益诚会计师事务所",
      "022": "江苏苏瑞华会计师事务所有限公司",
      "023": "江苏天舜会计师事务所有限公司",
      "024": "江苏润华会计师事务所有限公司",
      "025": "南京开元联合会计师事务所(特殊普通合伙)",
      "026": "江苏天元会计师事务所有限公司",
      "027": "江苏华弘会计师事务所有限公司",
      "028": "南京南审希地会计师事务所有限公司",
      "029": "江苏大华会计师事务所有限公司",
      "030": "上会苏州分所",
      "031": "苏州苏诚会计师事务所有限公司",
      "032": "江苏天泰会计师事务所有限公司",
      "033": "江苏中证会计师事务所有限公司",
      "034": "南京永宁会计师事务所有限公司",
      "035": "南通新江海联合会计师事务所（普通合伙）",
      "036": "江苏东衡会计师事务所有限公司",
      "037": "江苏天宁会计师事务所有限公司",
      "038": "江苏正中会计师事务所有限公司",
      "039": "江苏恒升会计师事务所有限公司",
      "040": "江苏中恒嘉华会计师事务所有限公司",
      "041": "江苏公信会计师事务所有限公司",
      "042": "江苏中天华夏会计师事务所有限公司",
      "043": "江苏天勤会计师事务所有限公司",
      "044": "江苏金陵会计师事务所有限责任公司",
      "045": "南京均益会计师事务所有限公司",
      "046": "江苏中衡会计师事务所有限公司",
      "047": "江苏兴瑞会计师事务所有限公司",
      "048": "南京宁瑞会计师事务所（普通合伙）",
      "049": "江苏兴华会计师事务所有限公司",
      "050": "永拓会计师事务所（特殊普通合伙）江苏分所",
      "051": "大华会计师事务所（特殊普通合伙）江苏分所",
      "052": "江苏海天会计师事务所有限公司",
      "053": "江苏华星会计师事务所有限公司",
      "054": "江苏利安达永诚会计师事务所有限公司",
      "055": "江苏兴光会计师事务所有限责任公司",
      "056": "立信中联会计师事务所（特殊普通合伙）江苏分所",
      "057": "苏州方本会计师事务所有限公司",
      "058": "无锡华夏中诚会计师事务所（普通合伙）",
      "059": "中天银会计师事务所有限责任公司江苏分所",
      "060": "江苏天诚会计师事务所有限公司",
      "061": "江苏天目会计师事务所有限公司",
      "062": "立信会计师事务所（特殊普通合伙）江苏分所",
      "063": "江苏捷宏捷宏普勤会计师事务所有限公司"
  },
  "projectRewardType": {
      "natural_science_award": "国家自然科学奖",
      "technical_invention_award": "国家技术发明奖",
      "science_and_technology_progress_award": "国家科技进步奖",
      "dept_science_and_technology_progress_award": "国家部门科技进步奖",
      "province_science_and_technology_award": "省科学技术奖"
  },
  "nomineeDisciplineField_C_C3": {
      "C3_1": "地理学",
      "C3_2": "地质学",
      "C3_3": "环境学",
      "C3_4": "生态学",
      "C3_5": "林学与草学",
      "C3_6": "水文学",
      "C3_7": "大气科学",
      "C3_8": "海洋科学",
      "C3_9": "古生物",
      "C3_10": "古人类",
      "C3_11": "古生态学"
  },
  "companyType": {
      "companyTypeB": "综合孵化机构",
      "companyTypeA": "专业孵化机构(产业聚集度应达75%以上)"
  },
  "unionRuleType": {
      "union_expert_rules": "专家规则"
  },
  "nomineeDisciplineField_C_C1": {
      "C1_1": "动物学",
      "C1_2": "植物学",
      "C1_3": "微生物学",
      "C1_4": "细胞生物学",
      "C1_5": "遗传学与生物信息学",
      "C1_6": "发育学与生殖生物学",
      "C1_7": "生物进化论"
  },
  "nomineeDisciplineField_C_C2": {
      "C2_1": "农学基础与作物学",
      "C2_2": "食品科学",
      "C2_3": "园艺学与植物保护学",
      "C2_4": "畜牧学",
      "C2_5": "兽医学",
      "C2_6": "水产学"
  },
  "avoidWay": {
      "avoidWay_plan": "计划类别",
      "avoidWay_project": "计划项目"
  },
  "highAdministrativeDivision": {
      "320100": "南京市",
      "320200": "无锡市",
      "320300": "徐州市",
      "320400": "常州市",
      "320500": "苏州市",
      "320600": "南通市",
      "320700": "连云港市",
      "320800": "淮安市",
      "320900": "盐城市",
      "321000": "扬州市",
      "321100": "镇江市",
      "321200": "泰州市",
      "321300": "宿迁市"
  },
  "awardLink": {
      "message_limit": "短信回复限制时间"
  },
  "economicType": {
      "economicTypeA": "国有企业",
      "economicTypeB": "集体企业",
      "economicTypeC": "私营企业",
      "economicTypeD": "有限责任公司",
      "economicTypeE": "股份有限公司",
      "economicTypeF": "股份合作企业",
      "economicTypeG": "其他企业"
  },
  "nomineeDisciplineField_K_K3": {
      "K3_1": "交通运输系统工程",
      "K3_2": "运输安全管理",
      "K3_3": "智慧交通",
      "K3_4": "城市道路运输",
      "K3_5": "铁路运输",
      "K3_6": "港口及水路运输",
      "K3_7": "机场及航空运输"
  },
  "transAbility_normal": {
      "18": "18",
      "17": "17",
      "16": "16",
      "15": "15",
      "14": "14",
      "13": "13"
  },
  "specialSupportUnitNature": {
      "Higher_education_institutions": "高等院校",
      "Research_institutes": "科研院所",
      "hospital": "医院",
      "state_owned_enterprise": "国有企业",
      "private_enterprise": "民营企业",
      "foreign_capital_enterprise": "外资企业",
      "other": "其他"
  },
  "nomineeDisciplineField_K_K1": {
      "K1_1": "土木建筑结构、规划",
      "K1_2": "土木工程施工",
      "K1_3": "市政工程",
      "K1_4": "防灾减灾工程",
      "K1_5": "岩土",
      "K1_6": "路基、路面工程",
      "K1_7": "桥涵工程",
      "K1_8": "隧道工程"
  },
  "nomineeDisciplineField_K_K2": {
      "K2_1": "水利工程勘测、施工",
      "K2_2": "河流泥沙工程",
      "K2_3": "海洋工程",
      "K2_4": "水资源利用与管理",
      "K2_5": "水利工程管理",
      "K2_6": "防洪抗旱减灾",
      "K2_7": "陆地水文",
      "K2_8": "大坝监测"
  },
  "titleType": {
      "senior": "正高级",
      "deputySenior": "副高级",
      "other": "其他"
  },
  "selectionMachineScale": {
      "1": "1:1",
      "2": "1:2",
      "3": "1:3",
      "4": "1:4",
      "5": "1:5",
      "6": "1:6",
      "7": "1:7",
      "8": "1:8",
      "9": "1:9",
      "10": "1:10"
  },
  "projectLevel": {
      "nationalLevel": "国家级",
      "provincialLevel": "省级"
  },
  "startFlowRevieStatus": {
      "AUDIT": "待审核",
      "PASSED": "通过",
      "RETURNED": "不通过"
  },
  "personCheckStatus": {
      "pass": "通过",
      "not_pass": "不通过"
  },
  "orgClassify": {
      "cuJinZhongXin": "生产力促进中心",
      "keJiXinXiZhongXIn": "科技信息中心",
      "JiShuShiChang": "技术市场",
      "keJiPingGuZhongXin": "科技评估中心",
      "keJiChuanYeFuWuZhongXin": "科技创业服务中心",
      "keJiZiXunZhongXin": "科技咨询机构",
      "qiTa": "其他"
  },
  "winningVolunteer": {
      "firstAward": "一等奖",
      "secondAward": "一、二等奖",
      "thirdAward": "一、二、三等奖"
  },
  "awardExpertLink": {
      "expert_network_review": "专家网评",
      "expert_major_review": "专业评审",
      "expert_comprehensive_review": "综合评审"
  },
  "acceptanceForm": {
      "centralized": "集中验收",
      "decentralized": "非集中验收"
  },
  "font_type": {
      "zcwjcx": "政策文件",
      "wzlj": "网站链接",
      "lxwm": "联系我们",
      "sxbl": "事项办理",
      "jhzncx": "计划指南",
      "xqsxcx": "行权事项",
      "kjggfw": "科技公共服务"
  },
  "customs_experience": {
      "none": "无",
      "overseas": "海外留学",
      "overseas_entrepreneurship": "海外创业",
      "overseas_work": "海外工作"
  },
  "transForm": {
      "001": "许可他人使用该科技成果",
      "002": "以该科技成果作为投资，折算股份或出资比例",
      "003": "自行投资实施转化",
      "004": "向他人转让该科技成果",
      "005": "以该科技成果作为合作条件，与他人共同实施转化",
      "006": "其他"
  },
  "external_interface_review": {
      "B100": "申报单位注册时间符合要求",
      "B200": "法人为独立法人",
      "B300": "申报单位为省内注册法人单位，重点项目子课题承担单位可为省外高校院所，且主管部门填写准确"
  },
  "conclusionType": {
      "summarize": "总结",
      "termination": "中止",
      "revoke": "撤销"
  },
  "expectedSituation": {
      "develop_research_and_development": "形成自主研发能力",
      "scale_development": "规模开发",
      "pilot_demonstration": "试点示范",
      "popularization_and_application": "推广应用",
      "breakthrough_key_technologies": "突破关键技术",
      "other": "其他"
  },
  "performanceEvaluationType": {
      "dishonesty": "失信专家",
      "poor_expert": "评价为较差专家",
      "two_poor_expert": "连续 2 次评价为较差专家"
  },
  "networkReviewResult": {
      "YES": "推荐进入奖励候选",
      "NO": "不推荐进入奖励候选"
  },
  "enterpriseExpertType": {
      "leader": "组长",
      "technical_expert": "技术专家",
      "financial_expert": "财务专家"
  },
  "highStayOutboundReason": {
      "objective": "专家客观原因",
      "performanceEvaluation": "专家评审后评估"
  },
  "techAdvancedLevel_lower": {
      "2": "2",
      "1": "1"
  },
  "reviewStatus": {
      "PASSED": "通过",
      "AUDIT": "待审核",
      "RETURNED": "不通过"
  },
  "creditSubjectLevel": {
      "commonly": "一般失信",
      "serious": "严重失信"
  },
  "retrievalRule": {
      "RoundUp": "向上取整",
      "RoundDown": "向下取整",
      "HalfAdjust": "四舍五入"
  },
  "isEnterpriseCoProduces": {
      "YES": "A.是（1-2分）",
      "NO": "B.否（0分）"
  },
  "participateProjectLevel": {
      "national": "国家级",
      "prov": "省级"
  },
  "projectLink": {
      "message_limit": "短信限制时间",
      "base_rules": "基础规则",
      "project_limit": "限项规则",
      "formality_review": "形式审查",
      "repetitive_review": "重复性审查",
      "guide_rules": "指南代码设置",
      "project_category": "申报代码关联规则"
  },
  "processResultColorMap": {
      "DISAGREE": "red",
      "AGREE": "#00C85F",
      "AUDIT": "#2D7AF7"
  },
  "terminalRoutesMap": {
      "all": "All",
      "terminal-expert": "EXPERT",
      "terminal-manage": "MANAGE"
  },
  "attachmentClassification": {
      "Storage instructions": "入库须知",
      "project_implement_inspect_template": "项目实施_数据填报_模板文件",
      "PROJECT_ACCEPTANCE_TECHNOLOGY_REPORT_TEMPLATE": "项目验收_科技报告_模板文件",
      "Review comments": "评审意见"
  },
  "intelPropertyObtainMode": {
      "autoResearch": "A. 有自主研发 (1-6分)",
      "onlyHaveTransfer": "B. 仅有受让、受赠和并购等 (1-3分)"
  },
  "reviewSearchResult": {
      "todo_review": "待标识",
      "intended_identification": "拟认定",
      "to_be_re_evaluated": "待重评",
      "not_passed": "不通过"
  },
  "projectStatusNewPacking": {
      "申报人填写中": "申报人填写中",
      "待承担单位审核": "待承担单位审核",
      "待主管部门审核": "待主管部门审核",
      "待专业机构审核": "待专业机构审核",
      "专业机构已受理": "专业机构已受理",
      "已立项": "已立项",
      "通过": "通过",
      "不通过": "不通过",
      "已退回": "已退回",
      "已撤回": "已撤回"
  },
  "projectLimitType": {
      "report_limit": "申报限项",
      "recommond_limit": "推荐限项"
  },
  "informationPublishStatus": {
      "draft": "草稿",
      "on": "上架",
      "off": "下架"
  },
  "enterRegisterType_100_150": {
      "151": "国有独资公司",
      "159": "其他有限责任公司"
  },
  "selectedTalentPlan": {
      "A100": "长江学者奖励计划“特聘（讲座）教授",
      "B100": "国家高层次人才特殊支持计划人选",
      "C100": "国家海外高层次人才引进计划人选",
      "D100": "国家杰出青年基金获得者"
  },
  "degreeEducation": {
      "1": "研究生",
      "2": "大学本科",
      "3": "大学专科和专科学校",
      "4": "中等专业学校",
      "5": "技工学校",
      "6": "高中",
      "7": "初中",
      "8": "小学",
      "9": "扫盲班",
      "10": "未上过学",
      "99": "其他"
  },
  "currentDevelopmentStage": {
      "survival_period": "生存期",
      "expansion_period": "扩张期",
      "maturation_period": "成熟期",
      "transition_period": "转型期"
  },
  "trainingMode": {
      "online": "线上",
      "offline": "线下"
  },
  "industrialTechnologyField_kj": {
      "100000": "科技管理"
  },
  "rewardLevel_nationalLevel": {
      "nationalLevel#1": "国家最高科学技术奖",
      "nationalLevel#2": "国家自然科学奖、国家技术发明奖、国家科学技术进步奖特等奖、一等奖、二等奖前3完成人",
      "nationalLevel#3": "国家自然科学奖、国家技术发明奖、国家科学技术进步奖特等奖、一等奖、二等奖前4-6完成人"
  },
  "nomineeDisciplineField_F_F3": {
      "F3_1": "生物试剂",
      "F3_2": "医用材料",
      "F3_3": "人工器官",
      "F3_4": "疾病诊断仪器",
      "F3_5": "大型医疗装备",
      "F3_6": "制药器械",
      "F3_7": "制药工业专用设备"
  },
  "nomineeDisciplineField_F_F2": {
      "F2_1": "中药学",
      "F2_2": "现代中药",
      "F2_3": "化学新药",
      "F2_4": "制药工程技术",
      "F2_5": "放射性药物",
      "F2_6": "生物技术药",
      "F2_7": "药剂学",
      "F2_8": "药理学",
      "F2_9": "药物分析与药品筛选",
      "F2_10": "药物实验动物学",
      "F2_11": "药物统计学"
  },
  "nomineeDisciplineField_F_F1": {
      "F1_1": "基因工程",
      "F1_2": "蛋白质",
      "F1_3": "核酸",
      "F1_4": "多肽",
      "F1_5": "干细胞",
      "F1_6": "疫苗",
      "F1_7": "生物芯片",
      "F1_8": "组织工程",
      "F1_9": "工业生物技术",
      "F1_10": "能源生物技术",
      "F1_11": "生物环保技术",
      "F1_12": "生物医学电子技术"
  },
  "enterRegisterType_100_140": {
      "141": "国有联营企业",
      "142": "集体联营企业",
      "143": "国有与集体联营企业",
      "149": "其他联营企业"
  },
  "constructionType": {
      "comprehensive": "综合型",
      "professional": "专业型"
  },
  "highStayEntryStatus": {
      "RECEIVED": "已入库",
      "OUTBOUND": "已出库",
      "PAUSED": "已冻结"
  },
  "projectPhaseForPacking": {
      "project_declare": "项目申报",
      "project_initiation": "项目立项"
  },
  "technicalAchievementType": {
      "001": "专利",
      "002": "版权",
      "003": "集成电路布图设计",
      "004": "其他"
  },
  "enterRegisterType_100_170": {
      "171": "私营独资企业",
      "172": "私营合伙企业",
      "173": "私营有限责任公司",
      "174": "私营股份有限公司"
  },
  "unionRuleLink": {
      "expert_review": "专家评审"
  },
  "batchAuditStatus": {
      "unapproved": "未开始",
      "inApproval": "待审核",
      "pass": "通过",
      "reject": "不通过"
  },
  "positionLevel": {
      "nationalLevel": "国家级",
      "provincialLevel": "省级",
      "enterpriseLevel": "企业级",
      "otherLevel": "其他"
  },
  "operateType": {
      "add": "新增",
      "remove": "移除"
  },
  "awardSortSeq": {
      "up": "上移",
      "down": "下移"
  },
  "recommendLevel": {
      "firstLevelCompetentDepartment": "一级主管部门",
      "secondaryCompetentDepartment": "二级主管部门"
  },
  "projectLink_declare": {
      "base_rules": "基础规则",
      "project_limit": "限项规则",
      "formality_review": "形式审查",
      "guide_rules": "指南代码设置",
      "project_category": "申报代码关联规则"
  },
  "effectiveStatus": {
      "in_effect": "生效中",
      "expired": "已失效",
      "pending_effective": "待生效"
  },
  "titleType_senior": {
      "professor": "教授",
      "researcher": "研究员",
      "Chief physician": "主任医师",
      "Chief pharmacist": "主任药师",
      "Chief nurse": "主任护师",
      "senior technologist": "主任技师",
      "Professor level senior engineer": "教授级高工",
      "professor of archives science": "研究馆员",
      "Other positive heights": "其他正高"
  },
  "laborRelations": {
      "fullTime": "全职",
      "parTime": "非全职"
  },
  "isSerious": {
      "not_serious": "情节不严重",
      "serious": "情节严重"
  },
  "intelPropertyObtainMode_autoResearch": {
      "6": "6",
      "5": "5",
      "4": "4",
      "3": "3",
      "2": "2",
      "1": "1"
  },
  "expertLink_review": {
      "expert_review": "评审指标设置"
  },
  "economicIndustry": {
      "A": "农、林、牧、渔业",
      "B": "采矿业",
      "C": "制造业",
      "D": "电力、燃气及水的生产和供应业",
      "E": "建筑业",
      "F": "交通运输、仓储和邮政业",
      "G": "信息传输、 计算机服务和软件业",
      "H": "批发和零售业",
      "I": "住宿和餐饮业",
      "J": "金融业",
      "K": "房地产业",
      "L": "租赁和商务服务业",
      "M": "科学研究、技术服务和地质勘察业",
      "N": "水利、环境和公共设施管理业",
      "O": "居民服务和其他服务业",
      "P": "教育",
      "Q": "卫生、社会保障和社会福利业",
      "R": "文化、体育和娱乐业",
      "S": "公共管理和社会组织",
      "T": "国际组织"
  },
  "guideDirection": {
      "guideDirection1": "未来信息",
      "guideDirection2": "未来材料",
      "guideDirection3": "未来健康",
      "guideDirection4": "未来制造",
      "guideDirection5": "未来空间",
      "guideDirection6": "未来能源",
      "guideDirection7": "其他领域"
  },
  "transferFlag": {
      "yes": "是",
      "no": "否"
  },
  "honorLevel_provincialLevel": {
      "provincialLevel#1": "江苏省有突出贡献中青年专家（专业技术人才、高技能人才）",
      "provincialLevel#2": "江苏省高层次创新创业人才（双创人才、双创团队）",
      "provincialLevel#3": "省“333高层次人才培养工程”第一层次培养对象",
      "provincialLevel#99": "其他"
  },
  "honorLevel": {
      "nationalLevel": "国家级",
      "provincialLevel": "省级"
  },
  "nomineeDisciplineField_M_M4": {
      "M4_1": "中医学",
      "M4_2": "针灸学",
      "M4_3": "中西医结合"
  },
  "nomineeDisciplineField_M_M3": {
      "M3_1": "流行病学",
      "M3_2": "传染病预防",
      "M3_3": "卫生检验学",
      "M3_4": "放射卫生学",
      "M3_5": "保健医学",
      "M3_6": "康复医学",
      "M3_7": "运动医学"
  },
  "nomineeDisciplineField_M_M2": {
      "M2_1": "普调外科",
      "M2_2": "神经外科",
      "M2_3": "胸外科",
      "M2_4": "骨科",
      "M2_5": "泌尿外科",
      "M2_6": "妇产科",
      "M2_7": "耳鼻咽喉科",
      "M2_8": "眼科",
      "M2_9": "口腔科"
  },
  "projectLeaderType": {
      "unitLegalPerson": "单位法人",
      "unitCorporatePrincipal": "单位法人委托人"
  },
  "nomineeDisciplineField_M_M1": {
      "M1_1": "心血管",
      "M1_2": "呼吸",
      "M1_3": "肾脏",
      "M1_4": "胃肠",
      "M1_5": "内分泌",
      "M1_6": "放射医学"
  },
  "formalityReviewType": {
      "system_auto_review": "系统自动审核",
      "external_interface_review": "外部接口审核",
      "manual_review": "人工审核"
  },
  "remindLabel": {
      "overage": "超龄",
      "dishonesty": "失信",
      "range": "较差",
      "poorTwice": "连续2次较差"
  },
  "reviewType_in": {
      "PROCESS_RECEIVED": "入库审核",
      "PROCESS_RENEW": "信息更新"
  },
  "areaType": {
      "outsideProvince": "省外",
      "insideProvince": "省内",
      "njCity": "南京市"
  },
  "ruleType": {
      "expert_rules": "专家规则",
      "project_rules": "项目规则"
  },
  "achievementSource": {
      "001": "自主研发",
      "002": "受让、受赠、并购",
      "003": "其他"
  },
  "obtainMethod": {
      "001": "自主研发",
      "002": "受让",
      "003": "受赠",
      "004": "并购",
      "005": "其他"
  },
  "process_type": {
      "reward_nomination": "奖励提名",
      "enterprise_declare": "企业申报",
      "PROJECT_IMPLEMENTATION_DATA_FILLING_EXAMINE": "项目实施_数据检查申请",
      "PROJECT_CONTRACT": "项目合同申请",
      "PROJECT_CONCLUSION": "项目结题申请",
      "PROJECT_ACCEPTANCE_TECHNOLOGY_REPORT": "项目验收_填写科技报告",
      "PROJECT_IMPLEMENTATION_MIDDLE_DATA_INSPECT": "项目实施_中期数据检查申请",
      "PROJECT_DECLARE": "项目申报受理申请",
      "PROJECT_ACCEPTANCE_APPLICATION": "项目验收_填写验收申请",
      "PROJECT_ACCEPTANCE_MATERIAL": "项目验收_上传验收材料",
      "PROJECT_APPROVAL": "项目立项申请",
      "PROCESS_IMPORT_ADMIN": "管理员导入申请",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门",
      "PROJECT_ALTER": "项目变更申请",
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      "PROCESS_EXPERT_USE": "专家库使用申请",
      "PROJECT_MATERIAL_REVIEW": "项目补充材料申请",
      "PROCESS_RECEIVED": "专家库入库申请",
      "PROCESS_PASSIVE_OUTBOUND": "专家库被动出库申请",
      "PROCESS_RENEW": "专家库信息更新",
      "ADD_BIND_UNIT": "新增绑定单位",
      "PROCESS_IMPORT_EXCHANGE": "省外交换导入申请",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      "PROCESS_OUTBOUND": "专家库主动出库申请",
      "PROCESS_IMPORT_DIRECTIONAL": "定向邀请导入申请"
  },
  "attendanceStatus": {
      "A": "已拒绝",
      "B": "可出席"
  },
  "administrativeDivision_320000": {
      "320100": "南京市",
      "320200": "无锡市",
      "320300": "徐州市",
      "320400": "常州市",
      "320500": "苏州市",
      "320600": "南通市",
      "320700": "连云港市",
      "320800": "淮安市",
      "320900": "盐城市",
      "321000": "扬州市",
      "321100": "镇江市",
      "321200": "泰州市",
      "321300": "宿迁市"
  },
  "nomineeDisciplineField_E_E5": {
      "E5_1": "微电子技术",
      "E5_2": "新型传感器",
      "E5_3": "传感网节点产品",
      "E5_4": "微纳器件",
      "E5_5": "光电子技术",
      "E5_6": "光电子器件",
      "E5_7": "高分子液晶材料",
      "E5_8": "半导体发光器件",
      "E5_9": "片式元器件"
  },
  "productEffect_none": {
      "0": "0"
  },
  "rewardLevel": {
      "nationalLevel": "国家级",
      "provincialLevel": "省级"
  },
  "updateStatus": {
      "to_be_updated": "待更新"
  },
  "nomineeDisciplineField_E_E4": {
      "E4_1": "集成电路设计、制造、封装、测试",
      "E4_2": "半导体材料",
      "E4_3": "集成电路关键设备",
      "E4_4": "集成电路专用材料",
      "E4_5": "高端专用芯片",
      "E4_6": "RFID",
      "E4_7": "MEMS"
  },
  "messageTypePlan": {
      "zcwjcx": "政策文件",
      "tzggcx": "通知公告",
      "sbzncx": "申报指南"
  },
  "nomineeDisciplineField_E_E3": {
      "E3_1": "机器学习",
      "E3_2": "模式识别",
      "E3_3": "知识工程与知识图谱",
      "E3_4": "海量数据处理与挖掘技术",
      "E3_5": "语言识别及中文信息处理",
      "E3_6": "智能无人系统"
  },
  "nomineeDisciplineField_E_E2": {
      "E2_1": "基础及应用数学",
      "E2_2": "计算科学及应用技术（云计算、并行计算、可信计算等）",
      "E2_3": "基础软件",
      "E2_4": "应用软件",
      "E2_5": "嵌入式软件及中间件",
      "E2_6": "数字媒体（动漫、网游、创意设计）",
      "E2_7": "软件服务及外包"
  },
  "enterpriseOtherInfo": {
      "isOnMarket": "企业是否上市",
      "marketTime": "上市时间",
      "stockCode": "股票代码",
      "marketType": "上市类型",
      "isInNationalHighZone": "是否属于国家级高新区内企业",
      "nationalHighZone": "高新区名称"
  },
  "researchField": {
      "A": "生物医药",
      "B": "医疗卫生",
      "C": "土木",
      "D": "建筑",
      "E": "水利",
      "F": "交通",
      "G": "电子信息",
      "H": "机械",
      "I": "化工",
      "J": "治金",
      "K": "材料",
      "L": "能源",
      "M": "矿业",
      "N": "农业",
      "O": "环境",
      "P": "食品",
      "Q": "其他领域"
  },
  "nomineeDisciplineField_E_E1": {
      "E1_1": "无线通信",
      "E1_2": "光通信",
      "E1_3": "卫星及微波通信",
      "E1_4": "信号与信息处理",
      "E1_5": "信息与网络安全",
      "E1_6": "三网融合及终端设备",
      "E1_7": "短距离无线通信",
      "E1_8": "多媒体移动终端",
      "E1_9": "电信增值服务",
      "E1_10": "有线及广播电视"
  },
  "intellectualTypeFlag": {
      "1": "I类",
      "2": "II类"
  },
  "highStayEvaluation2": {
      "normal": "一般",
      "core": "核心"
  },
  "achievementType": {
      "basic": "基础类",
      "application": "应用类"
  },
  "participationMethod": {
      "host": "主持",
      "join": "参与"
  },
  "nation": {
      "nation#1": "汉族",
      "nation#2": "蒙古族",
      "nation#3": "回族",
      "nation#4": "藏族",
      "nation#5": "维吾尔族",
      "nation#6": "苗族",
      "nation#7": "彝族",
      "nation#8": "壮族",
      "nation#9": "布依族",
      "nation#10": "朝鲜族",
      "nation#11": "满族",
      "nation#12": "侗族",
      "nation#13": "瑶族",
      "nation#14": "白族",
      "nation#15": "土家族",
      "nation#16": "哈尼族",
      "nation#17": "哈萨克族",
      "nation#18": "傣族",
      "nation#19": "黎族",
      "nation#20": "傈僳族",
      "nation#21": "佤族",
      "nation#22": "畲族",
      "nation#23": "高山族",
      "nation#24": "拉祜族",
      "nation#25": "水族",
      "nation#26": "东乡族",
      "nation#27": "纳西族",
      "nation#28": "景颇族",
      "nation#29": "柯尔克孜族",
      "nation#30": "土族",
      "nation#31": "达斡尔族",
      "nation#32": "仫佬族",
      "nation#33": "羌族",
      "nation#34": "布朗族",
      "nation#35": "撒拉族",
      "nation#36": "毛南族",
      "nation#37": "仡佬族",
      "nation#38": "锡伯族",
      "nation#39": "阿昌族",
      "nation#40": "普米族",
      "nation#41": "塔吉克族",
      "nation#42": "怒族",
      "nation#43": "乌孜别克族",
      "nation#44": "俄罗斯族",
      "nation#45": "鄂温克族",
      "nation#46": "德昂族",
      "nation#47": "保安族",
      "nation#48": "裕固族",
      "nation#49": "京族",
      "nation#50": "塔塔尔族",
      "nation#51": "独龙族",
      "nation#52": "鄂伦春族",
      "nation#53": "赫哲族",
      "nation#54": "门巴族",
      "nation#55": "珞巴族",
      "nation#56": "基诺族",
      "nation#97": "其他",
      "nation#98": "外国血统中国籍人"
  },
  "unitNature": {
      "Higher_education_institutions": "高校",
      "Research_institutes": "科研院所",
      "Medical_institutions": "医疗单位",
      "government_sector": "政府部门",
      "enterprise": "企业",
      "other": "其他"
  },
  "doubtTagType": {
      "FORMALITY_DOUBT_TAG": "形式审查存疑标签",
      "ACADEMIC_AWARD_FIVE_IN": "重复性审查存疑标签",
      "CREDIT_DOUBT_TAG": "信用审查存疑标签"
  },
  "projectType": {
      "101": "国家级-国家科技重大专项",
      "102": "国家级-国家重点研发计划",
      "103": "国家级-技术创新引导专项（基金）",
      "104": "国家级-国家自然科学基金",
      "105": "国家级-基地和人才专项",
      "199": "国家级-其它",
      "201": "省级-省科技成果转化专项",
      "202": "省级-省碳达峰碳中和科技创新专项",
      "203": "省级-苏南国家示范区专项",
      "204": "省级-创新支撑计划",
      "205": "省级-重点研发计划",
      "207": "省级-基础研究计划",
      "208": "省级-其他"
  },
  "manageLevel_six": {
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6"
  },
  "repeatReviewCategory": {
      "SEARCH_CONTENT": "研究内容",
      "ASSESSMENT_INDICATOR": "考核指标",
      "INNOVATION": "创新点",
      "DECLARATION": "申报书"
  },
  "administrativeDivisionType": {
      "Province": "省内",
      "Outside": "省外",
      "Nanjing": "南京"
  },
  "publishStatus": {
      "draft": "草稿",
      "published": "已发布"
  },
  "saveType": {
      "save": "暂存",
      "submit": "提交"
  },
  "enterSize": {
      "microenterprise": "微型企业",
      "small_business": "小型企业",
      "medium-size_enterprise": "中型企业",
      "large_enterprise": "大型企业",
      "extra_large_enterprise": "特大型企业"
  },
  "highStayExpertOperateType": {
      "received_proactively": "专家入库",
      "manager_outbound": "管理员操作出库",
      "manager_received": "管理员操作入库",
      "evaluate_outbound": "专家后评估规则出库"
  },
  "idType": {
      "100110": "中华人民共和国居民身份证",
      "100151": "中华人民共和国香港特别行政区护照",
      "100153": "中华人民共和国澳门特别行政区护照",
      "100155": "港澳居民来往内地通行证",
      "100157": "台湾居民来往大陆通行证",
      "100198": "外国（地区）护照",
      "100199": "其他证件"
  },
  "nominationSubPhase": {
      "network_review": "网络评审",
      "major_review": "专业评审",
      "comprehensive_review": "综合评审"
  },
  "module": {
      "project_check": "项目审查",
      "project_review": "项目评审",
      "project_implementation": "项目实施",
      "project_acceptance": "项目验收"
  },
  "groupBasis": {
      "sd": "手动分组",
      "guideCode": "指南代码",
      "disciplineField": "学科领域",
      "naturalScienceFoundationField": "国家自然科学基金领域",
      "industrialTechnologyField": "产业领域",
      "projectType": "申报代码"
  },
  "expertLink": {
      "expert_review": "评审指标设置"
  },
  "professionalField": {
      "mathematical_science": "数理科学",
      "chemistry": "化学",
      "environment_earth_science": "环境与地球科学",
      "information_science": "信息科学",
      "engineering": "工程",
      "material_science": "材料科学",
      "life_science": "生命科学",
      "medical_science": "医学",
      "economics_management": "经济与管理",
      "other": "其他"
  },
  "memberRole": {
      "super_admin": "超级管理员",
      "program_admin": "科技计划管理专员",
      "reward_admin": "奖励系统管理专员",
      "expert_admin": "科技咨询专家库管理专员",
      "ht_expert_admin": "高企专家库管理专员",
      "unit_manager": "用户申请审核管理专员",
      "unit_user": "成员"
  },
  "flowRevieStatus": {
      "TODO": "待提交",
      "AUDIT": "待审核",
      "PASSED": "通过",
      "RETURNED": "不通过"
  },
  "manageLevel_four": {
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4"
  },
  "productEffect_higher": {
      "6": "6",
      "5": "5"
  },
  "rewardLevel_provincialLevel": {
      "provincialLevel#1": "省科学技术突出贡献获得者",
      "provincialLevel#2": "省基础研究重大贡献奖",
      "provincialLevel#3": "省青年科技杰出贡献奖",
      "provincialLevel#4": "省科学技术奖一等奖前3完成人",
      "provincialLevel#5": "省科学技术奖一等奖前4-6完成人",
      "provincialLevel#6": "省科学技术奖二等奖第1完成人",
      "provincialLevel#7": "省科学技术奖二等奖前2-3完成人",
      "provincialLevel#99": "其他"
  },
  "TechnologyScope": {
      "1": "公开",
      "2": "延期"
  },
  "projectReviewStatusNew": {
      "toBeReviewed": "待评审",
      "reviewed": "已评审",
      "save": "已保存"
  },
  "initiationStatus": {
      "not_initiated": "未发起",
      "initiated": "已发起"
  },
  "objectiveType": {
      "expert_overage": "专家超龄",
      "unable_to_contact": "无法联系上专家",
      "others_reason": "其他原因"
  },
  "process_type_reward": {
      "reward_nomination": "奖励提名",
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      "ADD_BIND_UNIT": "新增绑定单位"
  },
  "avoidRule": {
      "avoidRule_1": "被选专家不在该组项目的研究人员列表中",
      "avoidRule_2": "被选专家回避申报单位",
      "avoidRule_3": "被选专家不在该组申报书主表的“被选专家回避参与单位”字段中",
      "avoidRule_8": "被选专家不是分组中申报项目单位的负责人",
      "avoidRule_9": "回避近两年在申报单位任职的专家"
  },
  "researchInstitutionDevelopment": {
      "national_engineering_technology_research_center": "国家级工程技术研究中心",
      "provincial_engineering_technology_research_center": "省级工程技术研究中心",
      "national_key_laboratory": "国家级重点实验室",
      "provincial_ministerial_key_laboratory": "部省级重点实验室",
      "national_science_technology_public_service_platform": "国家级科技公共服务平台",
      "provincial_science_technology_public_service_platform": "省级科技公共服务平台"
  },
  "emergingField_newB": {
      "newB_1": "冶金",
      "newB_2": "化工",
      "newB_3": "高端纺织",
      "newB_4": "绿色食品",
      "newB_5": "新型建材",
      "newB_6": "现代农业"
  },
  "nomineeDisciplineField_H_H3": {
      "H3_1": "钢铁冶金技术及装置、原料与处理技术",
      "H3_2": "钢铁加工与制造技术",
      "H3_3": "有色金属冶金技术及装置、加工与制造工艺技术",
      "H3_4": "金属复合材料",
      "H3_5": "高性能合金材料",
      "H3_6": "高性能稀土材料"
  },
  "emergingField_newA": {
      "newA_1": "高端装备",
      "newA_2": "集成电路",
      "newA_3": "新能源",
      "newA_4": "新材料",
      "newA_5": "生物医药",
      "newA_6": "新能源汽车",
      "newA_7": "新型电力装备",
      "newA_8": "节能环保",
      "newA_9": "软件与信息服务",
      "newA_10": "物联网",
      "newA_11": "新一代信息通信",
      "newA_12": "高新技术船舶和海工装备",
      "newA_13": "航空航天"
  },
  "nomineeDisciplineField_H_H4": {
      "H4_1": "电子级晶硅材料",
      "H4_2": "第三代半导体材料",
      "H4_3": "微电子材料",
      "H4_4": "光电子材料",
      "H4_5": "低维电子材料",
      "H4_6": "磁性材料"
  },
  "nomineeDisciplineField_H_H5": {
      "H5_1": "化工工程技术及装置",
      "H5_2": "石油炼制技术",
      "H5_3": "有机化工",
      "H5_4": "煤化工",
      "H5_5": "合成树脂与树胶",
      "H5_6": "化学纤维",
      "H5_7": "橡胶技术",
      "H5_8": "无机化工",
      "H5_9": "精细化学品",
      "H5_10": "生物化学",
      "H5_11": "电化学"
  },
  "remindLabelNew": {
      "overage": "超龄"
  },
  "techAdvancedLevel_high": {
      "8": "8",
      "7": "7"
  },
  "projectReviewStatus": {
      "toBeReviewed": "待评审",
      "reviewed": "已评审"
  },
  "productEffect_high": {
      "8": "8",
      "7": "7"
  },
  "nomineeDisciplineField_H_H1": {
      "H1_1": "碳纤维、石墨烯等先进碳材料",
      "H1_2": "陶瓷材料",
      "H1_3": "玻璃材料",
      "H1_4": "特种功能材料",
      "H1_5": "无机非金属复合材料"
  },
  "nomineeDisciplineField_H_H2": {
      "H2_1": "有机高分子材料",
      "H2_2": "功能高分子材料",
      "H2_3": "聚合物复合材料",
      "H2_4": "天然高分子产品加工"
  },
  "emergingField_newC": {
      "newC_1": "第三代半导体",
      "newC_2": "通用人工智能",
      "newC_3": "类脑智能",
      "newC_4": "量子科技",
      "newC_5": "氢能和新型储能",
      "newC_6": "深海深地空天",
      "newC_7": "合成生物",
      "newC_8": "细胞和基因技术",
      "newC_9": "未来网络",
      "newC_10": "先进计算",
      "newC_11": "元宇宙"
  },
  "ruleType_check": {
      "project_rules": "项目规则"
  },
  "overseasExperience": {
      "unlimited": "不限",
      "have_overseas_experience": "有海外学习工作经历",
      "not_have_overseas_experience": "无海外学习工作经历"
  },
  "positionLevel_enterpriseLevel_enterpriseLevel#1": {
      "enterpriseLevel#1#1": "创新型领军企业",
      "enterpriseLevel#1#2": "科技型上市公司",
      "enterpriseLevel#1#3": "行业骨干企业",
      "enterpriseLevel#1#4": "高新技术企业",
      "enterpriseLevel#1#5": "研发型企业",
      "enterpriseLevel#1#6": "其他"
  },
  "projectSubPhase": {
      "project_execution_data_filling": "项目执行数据填报",
      "upload_technology_report": "上传科技报告",
      "submit_acceptance_application": "提交验收申请",
      "mid_term_inspection_data_filling": "中期检查数据填报",
      "submit_acceptance_material": "提交验收材料"
  },
  "selectionMethodOffline": {
      "all_candidates": "人工选择",
      "machine_candidates": "智能遴选+人选",
      "full_machine": "智能遴选",
      "selection_list": "关联遴选名单"
  },
  "financingStatusObtained": {
      "intervention_from_venture_capital": "有创投介入",
      "loan_financial_institution": "金融机构贷款",
      "preparing_for_listing": "准备上市",
      "listed": "已经上市"
  },
  "enterRegisterType": {
      "100": "内资企业",
      "200": "港、澳、台商投资企业",
      "300": "外商投资企业"
  },
  "transAbility_low": {
      "6": "6",
      "5": "5",
      "4": "4",
      "3": "3",
      "2": "2",
      "1": "1"
  },
  "implementSituation": {
      "exceed_complete": "超额完成",
      "complete": "完成",
      "basically_complete": "基本完成",
      "incomplete": "未完成"
  },
  "nominationPhase": {
      "reward_nomination": "奖励提名",
      "reward_review": "奖励评审",
      "nomination_end": "提名结束"
  },
  "growthRateLevel_A": {
      "10": "10",
      "9": "9"
  },
  "comprehensiveExportType": {
      "NOMINATION_LETTER_OVERVIEW": "导出提名书概况",
      "SAT_TASK_SOURCE": "导出任务来源",
      "SAT_DIRECT_ECONOMIC_BENEFITS": "导出近二年直接经济效益",
      "MAIN_ACADEMIC_PAPERS_WORKS": "导出主要论文著作",
      "MAIN_INTELLECTUAL_PROPERTY_DIRECTORY": "导出主要知识产权目录",
      "SAT_COMPLETED_BY": "导出完成人",
      "SAT_COMPLETION_UNIT": "导出完成单位"
  },
  "incompleteReason": {
      "technology_change": "技术变化",
      "market_change": "市场变化",
      "funds_not_implemented": "经费未落实",
      "people_change": "项目负责人或技术骨干变动",
      "cooperation_rel_impact": "协作关系影响",
      "other_reason": "其他原因"
  },
  "main_economic_indicator": {
      "1": "新增销售收入",
      "2": "新增利润",
      "3": "新增税收",
      "4": "新增出口创收"
  },
  "degree": {
      "专科": "专科",
      "本科": "本科",
      "硕士": "硕士",
      "博士": "博士"
  },
  "complete_status": {
      "todo_complete": "待填报",
      "completing": "填报中",
      "complete": "已完成"
  },
  "isEnterpriseCoProduces_NO": {
      "0": "0"
  },
  "transResult": {
      "001": "新产品",
      "002": "新服务",
      "003": "新设备",
      "004": "新技术应用",
      "005": "样品/样机",
      "006": "其他"
  },
  "whetherOrNot": {
      "YES": "是",
      "NO": "否"
  },
  "projectPhase": {
      "project_declare": "项目申报",
      "project_check": "项目审查",
      "project_review": "项目评审",
      "project_second_review": "项目二次评审",
      "project_initiation": "项目立项",
      "project_contract": "项目合同",
      "project_implementation": "项目实施",
      "project_acceptance": "项目验收",
      "project_conclusion": "项目结题"
  },
  "highStayEvaluation": {
      "normal": "一般",
      "core": "核心",
      "leader": "组长"
  },
  "projectLevel_provincialLevel": {
      "provincialLevel#1": "省重点研发计划项目负责人",
      "provincialLevel#2": "省成果转化专项资金项目负责人",
      "provincialLevel#3": "省创新能力建设计划项目负责人",
      "provincialLevel#4": "省前沿引领技术基础研究专项项目负责人",
      "provincialLevel#5": "省杰出青年基金项目负责人",
      "provincialLevel#6": "其他省级科研项目（课题）负责人"
  },
  "comprehensiveReviewResult": {
      "YES": "一等奖",
      "NO": "二等奖"
  },
  "participateProjectLevel_national": {
      "national#1": "国家重点研发计划评审专家",
      "national#2": "国家杰出青年科学基金项目评审专家",
      "national#3": "国家优秀青年科学基金项目评审专家",
      "national#4": "国家自然科学基金其他项目评审专家",
      "national#5": "基础科学中心项目评审专家",
      "national#6": "创新研究群体项目评审专家",
      "national#7": "国家自然科学奖、国家技术发明奖、国家科学进步奖评审专家",
      "national#8": "其他国家级项目评审专家"
  },
  "memberRoleSelect": {
      "program_admin": "科技计划管理专员",
      "reward_admin": "奖励系统管理专员",
      "expert_admin": "科技咨询专家库管理专员",
      "ht_expert_admin": "高企专家库管理专员",
      "unit_manager": "用户申请审核管理专员"
  },
  "checkStatus": {
      "wait": "待审查",
      "pass": "通过",
      "not_pass": "不通过"
  },
  "productEffect_normal": {
      "4": "4",
      "3": "3"
  },
  "planFund": {
      "planFundA": "国家计划",
      "planFundB": "部委计划",
      "planFundC": "江苏省科技计划",
      "planFundD": "其他省、市、自治区计划",
      "planFundE": "企业",
      "planFundF": "国际合作",
      "planFundG": "自选",
      "planFundH": "其他"
  },
  "industrialTechnologyField_kj_100000": {
      "100100": "科技发展战略咨询",
      "100200": "科技政策与科技体制机制创新",
      "100300": "科技项目管理",
      "100400": "科技创新平台与科技创新创业载体建设与管理",
      "100500": "科技园区与特色产业基地建设与管理",
      "100600": "农业农村科技管理",
      "100700": "国际科技合作",
      "100800": "产学研与军民协同创新",
      "100900": "科技人才管理",
      "101000": "知识产权与技术转移转化",
      "101100": "科技金融",
      "101200": "科技经费管理"
  },
  "enterpriseReviewStatus": {
      "toBeReviewed": "待评审",
      "reviewed": "已评审",
      "back": "已退回"
  },
  "projectLink_review": {
      "message_limit": "短信限制时间"
  },
  "productEffect": {
      "high": "A.强（7-8分）",
      "higher": "B.较强（5-6分）",
      "normal": "C.一般（3-4分）",
      "lower": "D.较弱（1-2分）",
      "none": "E.无（0分）"
  },
  "technologyTitle": {
      "senior": "正高",
      "assistantSenior": "副高",
      "middle": "中级",
      "primary": "初级"
  },
  "operateModule": {
      "EXPERT_SELECT": "专家遴选",
      "EXPERT_INVITE": "专家邀请"
  },
  "titleType_deputySenior": {
      "associate professor": "副教授",
      "Senior lecturer": "高级讲师",
      "Associate Researcher": "副研究员",
      "Deputy Chief Physician": "副主任医师",
      "Deputy Chief Pharmacist": "副主任药师",
      "Deputy Chief Nurse": "副主任护师",
      "Deputy Chief Technician": "副主任技师",
      "senior experimentalist": "高级实验师",
      "Senior Engineer": "高级工程师",
      "Senior Economist": "高级经济师",
      "Senior Statistician": "高级统计师",
      "Senior Accountant": "高级会计师",
      "Senior Agronomist": "高级农艺师",
      "senior veterinarian": "高级兽医师",
      "Senior Animal Husbandry Specialist": "高级畜牧师",
      "Associate Research Librarian": "副研究馆员",
      "Other subtropical highs": "其他副高"
  },
  "volunteerSituation": {
      "suit": "符合",
      "eliminate": "淘汰"
  },
  "intelPropertyNum_high": {
      "8": "8",
      "7": "7"
  },
  "standardLevel": {
      "nation": "国家",
      "industry": "行业"
  },
  "nomineeDisciplineField_G_G1": {
      "G1_1": "太阳能技术及测试与装备",
      "G1_2": "风能技术及控制系统",
      "G1_3": "关键零部件",
      "G1_4": "生物质能",
      "G1_5": "新能源汽车及动力电池",
      "G1_6": "核能、地热能、海洋能等新能源技术与装备"
  },
  "nomineeDisciplineField_G_G2": {
      "G2_1": "能源动力系统节能减排技术",
      "G2_2": "锅炉",
      "G2_3": "热力系统",
      "G2_4": "石油、天然气、化工系统节能减排技术",
      "G2_5": "矿业、冶金、建材系统节能减排技术",
      "G2_6": "轻工机械、印染纺织系统节能减排技术"
  },
  "nomineeDisciplineField_G_G3": {
      "G3_1": "智能电网技术",
      "G3_2": "超导技术",
      "G3_3": "发电与电站工程",
      "G3_4": "输变电技术",
      "G3_5": "高电压与绝缘",
      "G3_6": "继电保护",
      "G3_7": "电力系统自动化",
      "G3_8": "电力设备装备",
      "G3_9": "电机与电器"
  },
  "prizeLevel": {
      "first_prize": "一等奖",
      "second_prize": "二等奖",
      "third_prize": "三等奖"
  },
  "projectStatusNew": {
      "申报人填写中": "申报人填写中",
      "待承担单位审核": "待承担单位审核",
      "待主管部门审核": "待主管部门审核",
      "待专业机构审核": "待专业机构审核",
      "待专业机构处长审核": "待专业机构处长审核",
      "待业务处室审核": "待业务处室审核",
      "待业务处室处员导入": "待业务处室处员导入",
      "待业务处室处长审核": "待业务处室处长审核",
      "待处员审查": "待处员审查",
      "待处长审查": "待处长审查",
      "待资统处复核": "待资统处复核",
      "待资统处发起": "待资统处发起",
      "待会商审核": "待会商审核",
      "评审中": "评审中",
      "评审完成": "评审完成",
      "不通过": "不通过",
      "已退回": "已退回",
      "通过": "通过",
      "已撤回": "已撤回"
  },
  "transAbility_better": {
      "24": "24",
      "23": "23",
      "22": "22",
      "21": "21",
      "20": "20",
      "19": "19"
  },
  "unitAttribute": {
      "unitAttributeA": "高等学校",
      "unitAttributeB": "研究院所",
      "unitAttributeC": "企业",
      "unitAttributeD": "机关、事业单位",
      "unitAttributeE": "医疗机构",
      "unitAttributeF": "其他"
  },
  "trainingSessions": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      "11": "11",
      "12": "12",
      "13": "13",
      "14": "14",
      "15": "15",
      "16": "16",
      "17": "17",
      "18": "18",
      "19": "19",
      "20": "20",
      ">20": "大于20"
  },
  "ruleType_declare": {
      "project_rules": "项目规则"
  },
  "projectIndexType": {
      "main_develop_indicator": "主要技术指标",
      "main_economic_indicator": "主要经济指标",
      "main_construction_task_indicator": "主要建设任务指标"
  },
  "projectLevel_nationalLevel": {
      "nationalLevel#1": "国家科技重大专项项目负责人（含技术总师、副总师）",
      "nationalLevel#2": "国家重点研发计划项目负责人（含首席科学家）",
      "nationalLevel#3": "原科技部863、973和科技支撑三大科技主体计划项目负责人（含首席科学家）",
      "nationalLevel#4": "国家重大工程项目负责人（含首席科学家）",
      "nationalLevel#5": "国家自然科学基金重大项目负责人",
      "nationalLevel#6": "国家自然科学基金创新研究群体项目负责人",
      "nationalLevel#7": "国家杰出青年科学基金项目负责人",
      "nationalLevel#8": "国防科技卓越青年科学基金项目负责人",
      "nationalLevel#9": "原科技部国家国际科技合作专项项目负责人",
      "nationalLevel#10": "其他国家级项目负责人（1000万以上，含1000万）",
      "nationalLevel#11": "其他国家级项目负责人（500-999万，含500万）",
      "nationalLevel#12": "其他国家级项目负责人（100-499万，含100万）",
      "nationalLevel#13": "其他国家级项目负责人",
      "nationalLevel#14": "国家科技计划专家组成员"
  },
  "emergingField": {
      "newA": "新兴产业",
      "newB": "传统产业",
      "newC": "未来产业"
  },
  "enterprisePersonInfo": {
      "enterpriseCertificateNumber": "身份证号/护照号",
      "enterpriseMobilePhone": "手机",
      "enterpriseFaxNumber": "传真",
      "enterpriseEmail": "Email",
      "enterpriseTelephone": "电话",
      "enterprisePersonName": "姓名"
  },
  "politicsStatus": {
      "politicsStatus#1": "中共党员",
      "politicsStatus#2": "中共预备党员",
      "politicsStatus#3": "共青团员",
      "politicsStatus#4": "民革会员",
      "politicsStatus#5": "民盟盟员",
      "politicsStatus#6": "民建会员",
      "politicsStatus#7": "民进会员",
      "politicsStatus#8": "农工党党员",
      "politicsStatus#9": "致公党党员",
      "politicsStatus#10": "九三学社社员",
      "politicsStatus#11": "台盟盟员",
      "politicsStatus#12": "无党派人士",
      "politicsStatus#13": "群众"
  },
  "reviewMethod": {
      "online": "网评",
      "offline": "会评"
  },
  "entryStatus": {
      "RECEIVED": "已入库",
      "OUTBOUND": "已出库",
      "PAUSED": "已冻结",
      "OUTING": "出库中"
  },
  "removeExpertReason": {
      "answer_too_long": "长时间未回复",
      "expert_active_return": "专家主动退评",
      "review_no_process": "评审无进展或进展慢",
      "other": "其他"
  },
  "academicDegree": {
      "bachelor": "学士",
      "master": "硕士",
      "doctor": "博士",
      "other": "其他"
  },
  "displaySide": {
      "front_side": "门户",
      "manage_side": "管理端"
  },
  "expertSource": {
      "collect": "信息征集",
      "directional": "定向邀请",
      "exchange": "省外交换",
      "admin": "管理员导入"
  },
  "productEffect_lower": {
      "2": "2",
      "1": "1"
  },
  "intelPropertyObtainMode_onlyHaveTransfer": {
      "3": "3",
      "2": "2",
      "1": "1"
  },
  "projectFundExpenseType": {
      "direct_cost": "（一）直接费用",
      "equipment_cost": "1、设备费",
      "travel_cost": "3、差旅费/会议费/国际合作交流费",
      "material_cost": "2、材料费/测试化验加工费/燃料动力费",
      "service_fee": "4、劳务费/专家咨询费",
      "other_expense": "5、其他支出",
      "indirect_cost": "（二）间接费用",
      "management_fee": "6、管理费",
      "performance_expense": "7、绩效支出",
      "balance_fund": "（三）结余资金",
      "total_fund": "合计："
  },
  "honorLevel_nationalLevel": {
      "nationalLevel#1": "中国科学院院士",
      "nationalLevel#2": "中国工程院院士",
      "nationalLevel#3": "外籍院士",
      "nationalLevel#4": "国家高层次人才特殊支持计划",
      "nationalLevel#5": "国家海外高层次人才引进计划人选",
      "nationalLevel#6": "“长江学者奖励计划”特聘（讲座）教授",
      "nationalLevel#7": "国家创新人才推进计划人选",
      "nationalLevel#8": "全国杰出专业技术人才",
      "nationalLevel#9": "百千万人才工程国家级人选",
      "nationalLevel#10": "国家级领军人才工程人选",
      "nationalLevel#11": "国家有突出贡献中青年专家",
      "nationalLevel#12": "中国青年科技奖获得者",
      "nationalLevel#13": "享受国务院特殊津贴专家",
      "nationalLevel#14": "青年长江学者",
      "nationalLevel#99": "其他"
  },
  "unitAttribute_unitAttributeC": {
      "C1": "国有企业",
      "C2": "民营企业"
  },
  "unitAttribute_unitAttributeB": {
      "B1": "部属研究院所",
      "B2": "省属研究院所",
      "B3": "市县属研究院所"
  },
  "reviewStatusColorMap": {
      "PASSED": "#00C85F",
      "AUDIT": "#2D7AF7",
      "RETURNED": "red"
  },
  "unitAttribute_unitAttributeA": {
      "A1": "部属高校",
      "A2": "省属高校",
      "A3": "市属高校"
  },
  "rewardLevelNew": {
      "first_prize": "一等奖",
      "second_prize": "二等奖",
      "third_prize": "三等奖"
  },
  "listTask1": {
      "list_task1_001": "未来信息",
      "list_task1_002": "未来材料",
      "list_task1_003": "未来健康",
      "list_task1_004": "未来制造",
      "list_task1_005": "未来空间",
      "list_task1_006": "未来能源",
      "list_task1_007": "其他领域"
  },
  "processResult": {
      "DISAGREE": "不通过",
      "AUDIT": "审核中",
      "AGREE": "通过"
  },
  "guideDirection_guideDirection3": {
      "3011": "3011细胞与基因技术",
      "3012": "3012合成生物",
      "3013": "3013类脑智能"
  },
  "guideDirection_guideDirection4": {
      "4011": "4011原子制造",
      "4012": "4012类人机器人",
      "4013": "4013智能网联汽车",
      "4014": "4014智能制造"
  },
  "guideDirection_guideDirection5": {
      "5011": "5011深海深地",
      "5012": "5012低空经济技术",
      "5013": "5013商业航天技术"
  },
  "guideDirection_guideDirection6": {
      "6011": "6011氢能技术",
      "6012": "6012新型储能",
      "6013": "6013先进核能"
  },
  "positionLevel_enterpriseLevel": {
      "enterpriseLevel#1": "企业技术负责人或高级管理人员"
  },
  "evaluateRule": {
      "A or B": "A、B",
      "A or B or C": "A、B、C"
  },
  "reviewStatusNew": {
      "PASSED": "通过",
      "AUDIT": "待审核",
      "RETURNED": "不通过",
      "RECALL": "已撤回"
  },
  "guideDirection_guideDirection1": {
      "1011": "1011通用人工智能",
      "1012": "1012量子科技",
      "1013": "1013未来科技",
      "1014": "1014元宇宙",
      "1015": "1015先进计算"
  },
  "guideDirection_guideDirection2": {
      "2011": "2011新型电子材料",
      "2012": "2012高端功能与智能材料",
      "2013": "2013先进结构与复合材料",
      "2014": "2014材料基因工程"
  },
  "techAdvancedLevel": {
      "high": "A.高（7-8分）",
      "higher": "B.较高（5-6分）",
      "normal": "C.一般（3-4分）",
      "lower": "D.较低（1-2分）",
      "none": "E.无（0分）"
  },
  "guideDirection_guideDirection7": {
      "7011": "7011其他领域"
  },
  "shotCheckReviewResult": {
      "wait": "暂缓",
      "pass": "通过"
  },
  "system_auto_review": {
      "A200": "项目负责人信息合规"
  },
  "highStayExpertType": {
      "financial_expert": "财务专家",
      "technical_expert": "技术专家"
  },
  "enterpriseContactInfo": {
      "contactName": "姓名",
      "contactPhone": "手机",
      "contactNumber": "身份证号/护照号",
      "contactTelephone": "电话",
      "contactFaxNumber": "传真",
      "contactEmail": "Email"
  },
  "checkArgumentStatus": {
      "wait": "待论证",
      "pass": "不重复",
      "not_pass": "重复"
  },
  "administrativeDivision": {
      "320000": "江苏省",
      "120000": "天津市",
      "110000": "北京市",
      "130000": "河北省",
      "140000": "山西省",
      "150000": "内蒙古自治区",
      "210000": "辽宁省",
      "220000": "吉林省",
      "230000": "黑龙江省",
      "310000": "上海市",
      "330000": "浙江省",
      "340000": "安徽省",
      "350000": "福建省",
      "360000": "江西省",
      "370000": "山东省",
      "410000": "河南省",
      "420000": "湖北省",
      "430000": "湖南省",
      "440000": "广东省",
      "450000": "广西壮族自治区",
      "460000": "海南省",
      "500000": "重庆市",
      "510000": "四川省",
      "520000": "贵州省",
      "530000": "云南省",
      "540000": "西藏自治区",
      "610000": "陕西省",
      "620000": "甘肃省",
      "630000": "青海省",
      "640000": "宁夏回族自治区",
      "650000": "新疆维吾尔自治区",
      "710000": "台湾省",
      "810000": "香港特别行政区",
      "820000": "澳门特别行政区"
  },
  "growthRateLevel": {
      "A": "A.≥35%(9-10分)",
      "B": "B.≥25%(7-8分)",
      "C": "C.≥15% (5-6分)",
      "D": "D.≥5%  (3-4分)",
      "E": "E.>0(1-2分)",
      "F": "F.≤0(0分)"
  },
  "newEntryStatus": {
      "RECEIVED": "已入库",
      "OUTBOUND": "已出库",
      "OUTING": "出库中"
  },
  "growthRateLevel_D": {
      "4": "4",
      "3": "3"
  },
  "growthRateLevel_E": {
      "2": "2",
      "1": "1"
  },
  "growthRateLevel_B": {
      "8": "8",
      "7": "7"
  },
  "growthRateLevel_C": {
      "6": "6",
      "5": "5"
  },
  "nomineeDisciplineField_B_B1": {
      "B1_1": "化学理论与机制",
      "B1_2": "分析化学",
      "B1_3": "合成化学",
      "B1_4": "无机化学",
      "B1_5": "有机化学",
      "B1_6": "能源化学",
      "B1_7": "核化学",
      "B1_8": "催化与表面化学",
      "B1_9": "超导技术",
      "B1_10": "碳达峰碳中和前沿理论"
  },
  "nomineeDisciplineField_B_B2": {
      "B2_1": "金属材料",
      "B2_2": "无机非金属材料",
      "B2_3": "有机高分子材料",
      "B2_4": "复合材料",
      "B2_5": "纳米材料",
      "B2_6": "材料表面与界面",
      "B2_7": "材料失效与保护",
      "B2_8": "材料检测与分析理论"
  },
  "supervisionDepartment": {
      "18720079773": "张三 188****1111",
      "18720079774": "李四 188****1112",
      "18720079775": "王五 188****1113"
  },
  "growthRateLevel_F": {
      "0": "0"
  },
  "highStayExpertSource": {
      "single_add": "单个添加",
      "batch_import": "批量导入"
  },
  "smsExpertFeedbackStatus": {
      "unConfirmed": "待确认",
      "attend": "已短信邀请",
      "timeout": "超时",
      "reject": "已拒绝",
      "notInvite": "未邀请"
  },
  "manual_review": {
      "C100": "申报材料齐全规范（含项目信息表、附件审核表、申报书、项目负责人信用承诺书、项目承担单位信用承诺书、项目主管部门信用承诺书）",
      "C200": "申报材料签字、盖章和日期完整（含审核推荐表、信用承诺书、附件审核表、项目人员签字）",
      "C300": "项目计划类别正确，未出现明显不符合本计划定位和指南范围的情况",
      "C400": "申报材料题目与系统内题目一致性，申报材料前后一致"
  },
  "intelPropertyNum_lower": {
      "2": "2",
      "1": "1"
  },
  "evaluateType": {
      "A": "A",
      "B": "B",
      "C": "C"
  },
  "importTypeMap": {
      "directional": "定向邀请",
      "exchange": "省外交换",
      "admin": "管理员导入"
  },
  "listTask": {
      "list_task_001": "第三代半导体",
      "list_task_002": "6G技术",
      "list_task_003": "人工智能",
      "list_task_004": "战略新材料",
      "list_task_005": "集成电路",
      "list_task_006": "生物医药",
      "list_task_007": "高端装备",
      "list_task_008": "新能源",
      "list_task_009": "氢能与储能"
  },
  "transAbility_strong": {
      "30": "30",
      "29": "29",
      "28": "28",
      "27": "27",
      "26": "26",
      "25": "25"
  },
  "nomineeDisciplineField_J_J2": {
      "J2_1": "环境监测与预报",
      "J2_2": "环境监测仪器与系统",
      "J2_3": "水、固、气污染防治技术及设备",
      "J2_4": "环保成套技术及装备"
  },
  "nomineeDisciplineField_J_J1": {
      "J1_1": "环境学",
      "J1_2": "气象学",
      "J1_3": "环境生态保护与修复工程"
  },
  "majorReviewResult": {
      "NO": "三等奖",
      "YES": "候选一、二等奖"
  },
  "nomineeDisciplineField_J_J4": {
      "J4_1": "凿岩爆破工程",
      "J4_2": "井巷工程",
      "J4_3": "矿山压力与支护",
      "J4_4": "矿山生产安全",
      "J4_5": "劳动安全技术",
      "J4_6": "消防工程",
      "J4_7": "地质灾害监测预报与防治",
      "J4_8": "工程地震技术"
  },
  "nomineeDisciplineField_J_J3": {
      "J3_1": "土地资源调查与利用",
      "J3_2": "海洋资源调查与观测",
      "J3_3": "矿产、油气资源勘探与开发开采工程",
      "J3_4": "石油、天然气储存与运输工程",
      "J3_5": "煤炭与矿山装备",
      "J3_6": "工程地质、矿产调查与评价",
      "J3_7": "生态地理调查、评价与规划"
  },
  "selectionMethod": {
      "all_candidates": "人工选择",
      "full_machine": "智能遴选",
      "machine_candidates": "智能遴选+人工选择"
  },
  "awardRuleType": {
      "award_rules": "奖项规则",
      "expert_rules": "专家规则"
  },
  "transAbility_none": {
      "0": "0"
  },
  "personCheckStatusNew": {
      "pass": "是",
      "not_pass": "否"
  },
  "auditResult": {
      "DISAGREE": "拒绝",
      "AGREE": "同意"
  },
  "preSelectStatus": {
      "INVITED": "已被邀请",
      "SELECTED": "已被选择",
      "RETURN": "专家退评",
      "REMOVED": "已被移除",
      "WAITING": "等待中"
  },
  "awardStatus": {
      "todo_confirm": "待确认",
      "removed": "已移除",
      "confirmed": "已确认"
  },
  "developerType": {
      "leader_developer": "负责人员",
      "main_developer": "骨干人员",
      "join_developer": "参与人员"
  },
  "TechnologyOffice": {
      "江苏科技局": "江苏科技局",
      "南京科技局": "南京科技局",
      "苏州科技局": "苏州科技局"
  },
  "nationalityOverseas": {
      "Hong Kong(Special Administrative Region of China)": "中国香港",
      "Macao(Special Administrative Region of China)": "中国澳门",
      "Taiwan Province of China": "中国台湾省",
      "Argentina": "阿根廷",
      "Afghanistan": "阿富汗",
      "United Arab Emirates (the)": "阿联酋",
      "Algeria": "阿尔及利亚",
      "Albania": "阿尔巴尼亚",
      "Aruba": "阿鲁巴",
      "Oman": "阿曼",
      "Azerbaijan": "阿塞拜疆",
      "Egypt": "埃及",
      "Ethiopia": "埃塞俄比亚",
      "Ireland": "爱尔兰",
      "Estonia": "爱沙尼亚",
      "Andorra": "安道尔",
      "Angola": "安哥拉",
      "Anguilla": "安圭拉岛(英)",
      "Antigua and Barbuda": "安提瓜和巴布达",
      "Austria": "奥地利",
      "Aland Islands": "奥兰群岛(芬兰自治省)",
      "Australia": "澳大利亚",
      "Barbados": "巴巴多斯",
      "Papua New Guinea": "巴布亚新几内亚",
      "Bahamas (the)": "巴哈马",
      "Pakistan": "巴基斯坦",
      "Paraguay": "巴拉圭",
      "Palestine State of": "巴勒斯坦国",
      "Bahrain": "巴林",
      "Panama": "巴拿马",
      "Brazil": "巴西",
      "Belarus": "白俄罗斯",
      "Bermuda": "百慕大",
      "Bulgaria": "保加利亚",
      "Northern Mariana Islands (the)": "北马里亚纳群岛",
      "North Macedonia": "北马其顿",
      "Benin": "贝宁",
      "Belgium": "比利时",
      "Iceland": "冰岛",
      "Puerto Rico": "波多黎各",
      "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
      "Poland": "波兰",
      "Bolivia(Plurinational State of)": "玻利维亚",
      "Belize": "伯利兹",
      "Bonaire Sint Eustatius and Saba": "博奈尔岛、圣尤斯特歇斯岛和萨巴岛",
      "Botswana": "博茨瓦纳",
      "Bhutan": "不丹",
      "Burkina Faso": "布基纳法索",
      "Burundi": "布隆迪",
      "Bouvet Island": "布韦岛",
      "Korea(the Democratic People's Republic of)": "朝鲜",
      "Equatorial Guinea": "赤道几内亚",
      "Denmark": "丹麦",
      "Germany": "德国",
      "Timor-Leste": "东帝汶",
      "Togo": "多哥",
      "Dominican Republic(the)": "多米尼加",
      "Dominica": "多米尼克",
      "Russian Federation(the)": "俄罗斯",
      "Ecuador": "厄瓜多尔",
      "Eritrea": "厄立特里亚",
      "France": "法国",
      "Faroe Islands(the)": "法罗群岛",
      "French Polynesia": "法属波利尼西亚",
      "French Guiana": "法属圭亚那",
      "French Southern Territories (the)": "法属南部领地",
      "Holy See(the)[Vatican City State]": "梵蒂冈",
      "Philippines(the)": "菲律宾",
      "Fiji": "斐济",
      "Finland": "芬兰",
      "Cape Verde": "佛得角",
      "Falkland Islands (the) [Malvinas]": "福克兰群岛(又称马尔维纳斯群岛)",
      "Gambia (the)": "冈比亚",
      "Congo": "刚果(布)",
      "Congo(the Democratic Republic of the)": "刚果(金)",
      "Colombia": "哥伦比亚",
      "Costa Rica": "哥斯达黎加",
      "Grenada": "格林纳达",
      "Greenland": "格陵兰",
      "Georgia": "格鲁吉亚",
      "Guernsey": "根西岛",
      "Cuba": "古巴",
      "Guadeloupe": "瓜德罗普",
      "Guam": "关岛",
      "Guyana": "圭亚那",
      "Kazakhstan": "哈萨克斯坦",
      "Haiti": "海地",
      "Korea(the Republic of)": "韩国",
      "Netherlands(the)": "荷兰",
      "Heard Island and McDonald Islands": "赫德岛和麦克唐纳群岛",
      "Montenegro": "黑山",
      "Honduras": "洪都拉斯",
      "Kiribati": "基里巴斯",
      "Djibouti": "吉布提",
      "Kyrgyzstan": "吉尔吉斯斯坦",
      "Guinea": "几内亚",
      "Guinea-Bissau": "几内亚比绍",
      "Canada": "加拿大",
      "Ghana": "加纳",
      "Gabon": "加蓬",
      "Cambodia": "柬埔寨",
      "Czechia": "捷克",
      "Zimbabwe": "津巴布韦",
      "Cameroon": "喀麦隆",
      "Qatar": "卡塔尔",
      "Cayman Islands (the)": "开曼群岛",
      "Cocos (Keeling) Islands": "科科斯(基灵)群岛",
      "Comoros": "科摩罗",
      "Cote d'Ivoire": "科特迪瓦",
      "Kuwait": "科威特",
      "Croatia": "克罗地亚",
      "Kenya": "肯尼亚",
      "Cook Islands(the)": "库克群岛",
      "Curacao": "库拉索",
      "Latvia": "拉脱维亚",
      "Lesotho": "莱索托",
      "Lao People's Democratic Republic(the)": "老挝",
      "Lebanon": "黎巴嫩",
      "Lithuania": "立陶宛",
      "Liberia": "利比里亚",
      "Libya": "利比亚",
      "Liechtenstein": "列支敦士登",
      "Réunion": "留尼汪",
      "Luxembourg": "卢森堡",
      "Rwanda": "卢旺达",
      "Romania": "罗马尼亚",
      "Madagascar": "马达加斯加",
      "Isle of Man": "马恩岛",
      "Maldives": "马尔代夫",
      "Malta": "马耳他",
      "Malawi": "马拉维",
      "Malaysia": "马来西亚",
      "Mali": "马里",
      "Marshall Islands(the)": "马绍尔群岛",
      "Martinique": "马提尼克",
      "Mayotte": "马约特",
      "Mauritius": "毛里求斯",
      "Mauritania": "毛里塔尼亚",
      "United States of America(the)": "美国",
      "United States Minor Outlying Islands (the)": "美国本土外小岛屿",
      "American Samoa": "美属萨摩亚",
      "Virgin Islands(U.S.)": "美属维尔京群岛",
      "Mongolia": "蒙古国",
      "Montserrat": "蒙特塞拉特",
      "Bangladesh": "孟加拉国",
      "Peru": "秘鲁",
      "Micronesia(the Federated States of)": "密克罗尼西亚",
      "Myanmar": "缅甸",
      "Moldova (the Republic of)": "摩尔多瓦",
      "Morocco": "摩洛哥",
      "Monaco": "摩纳哥",
      "Mozambique": "莫桑比克",
      "Mexico": "墨西哥",
      "Namibia": "纳米比亚",
      "South Africa": "南非",
      "Antarctica": "南极洲",
      "South Georgia and the South Sandwich Islands": "南乔治亚岛和南桑威奇群岛",
      "South Sudan": "南苏丹",
      "Nauru": "瑙鲁",
      "Nepal": "尼泊尔",
      "Nicaragua": "尼加拉瓜",
      "Niger(the)": "尼日尔",
      "Nigeria": "尼日利亚",
      "Niue": "纽埃",
      "Norway": "挪威",
      "Norfolk Island": "诺福克岛",
      "Palau": "帕劳",
      "Pitcairn": "皮特凯恩岛",
      "Portugal": "葡萄牙",
      "Japan": "日本",
      "Sweden": "瑞典",
      "Switzerland": "瑞士",
      "El Salvador": "萨尔瓦多",
      "Samoa": "萨摩亚",
      "Serbia": "塞尔维亚",
      "Sierra Leone": "塞拉利昂",
      "Senegal": "塞内加尔",
      "Cyprus": "塞浦路斯",
      "Seychelles": "塞舌尔",
      "Saudi Arabia": "沙特阿拉伯",
      "Saint Barthélemy": "圣巴泰勒米",
      "Christmas Island": "圣诞岛",
      "Sao Tome and Principe": "圣多美和普林西比",
      "Saint Helena Ascension and Tristan daCunha": "圣赫勒拿-阿森松-特里斯坦-达库尼亚",
      "Saint Kitts and Nevis": "圣基茨和尼维斯",
      "Saint Lucia": "圣卢西亚",
      "Saint Martin(French Part)": "圣马丁(法属)",
      "Saint Martin(Dutch Part)": "圣马丁(荷兰属 )",
      "San Marino": "圣马力诺",
      "Saint Pierre and Miquelon": "圣皮埃尔和密克隆",
      "Saint Vincent and the Grenadines": "圣文森特和格林纳丁斯",
      "Sri Lanka": "斯里兰卡",
      "Slovakia": "斯洛伐克",
      "Slovenia": "斯洛文尼亚",
      "Svalbard and Jan Mayen": "斯瓦尔巴和扬马延",
      "Eswatini": "斯威士兰",
      "Sudan(the)": "苏丹",
      "Suriname": "苏里南",
      "Solomon Islands": "所罗门群岛",
      "Somalia": "索马里",
      "Tajikistan": "塔吉克斯坦",
      "Thailand": "泰国",
      "Tanzania the United Republic of": "坦桑尼亚",
      "Tonga": "汤加",
      "Turks and Caicos Islands (the)": "特克斯和凯科斯群岛",
      "Trinidad and Tobago": "特立尼达和多巴哥",
      "Tunisia": "突尼斯",
      "Tuvalu": "图瓦卢",
      "Turkey": "土耳其",
      "Turkmenistan": "土库曼斯坦",
      "Tokelau": "托克劳",
      "Wallis and Futuna": "瓦利斯和富图纳",
      "Vanuatu": "瓦努阿图",
      "Guatemala": "危地马拉",
      "Venezuela(Bolivarian Republic of)": "委内瑞拉玻利瓦尔共和国",
      "Brunei Darussalam": "文莱",
      "Uganda": "乌干达",
      "Ukraine": "乌克兰",
      "Uruguay": "乌拉圭",
      "Uzbekistan": "乌兹别克斯坦",
      "Spain": "西班牙",
      "Western Sahara": "西撒哈拉",
      "Greece": "希腊",
      "Singapore": "新加坡",
      "New Caledonia": "新喀里多尼亚",
      "New Zealand": "新西兰",
      "Hungary": "匈牙利",
      "Syrian Arab Republic(the)": "叙利亚",
      "Jamaica": "牙买加",
      "Armenia": "亚美尼亚",
      "Yemen": "也门",
      "Iraq": "伊拉克",
      "Iran (Islamic Republic of)": "伊朗",
      "Israel": "以色列",
      "Italy": "意大利",
      "India": "印度",
      "Indonesia": "印度尼西亚",
      "United Kingdom of Great Britain and Northern Ireland (the)": "英国",
      "Virgin Islands(British)": "英属维尔京群岛",
      "British Indian Ocean Territory (the)": "英属印度洋领地",
      "Jordan": "约旦",
      "Viet Nam": "越南",
      "Zambia": "赞比亚",
      "Jersey": "泽西岛",
      "Chad": "乍得",
      "Gibraltar": "直布罗陀",
      "Chile": "智利",
      "Central African Republic(the)": "中非共和国"
  },
  "expertTitleType": {
      "over_deputySenior": "副高及以上",
      "senior": "正高"
  },
  "idTypeSimple": {
      "111": "居民身份证",
      "516": "港澳居民来往内地通行证",
      "511": "台湾居民来往内地通行证",
      "553": "外国人永久居留身份证"
  },
  "expectedFinancingType": {
      "venture_capital_intervention": "创投介入",
      "bank_loan": "银行贷款",
      "pre-listing_tutoring": "上市辅导",
      "financing_guarantee": "融资担保"
  },
  "process_type_manage": {
      "PROJECT_DECLARE": "项目申报受理申请",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      "ADD_BIND_UNIT": "新增绑定单位",
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      "PROJECT_MATERIAL_REVIEW": "项目补充材料申请",
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      "PROJECT_APPROVAL": "项目立项申请",
      "PROJECT_CONTRACT": "项目合同申请",
      "PROJECT_IMPLEMENTATION_DATA_FILLING_EXAMINE": "项目实施_数据检查申请",
      "PROJECT_IMPLEMENTATION_MIDDLE_DATA_INSPECT": "项目实施_中期数据检查申请",
      "PROJECT_ACCEPTANCE_TECHNOLOGY_REPORT": "项目验收_填写科技报告",
      "PROJECT_ACCEPTANCE_APPLICATION": "项目验收_填写验收申请",
      "PROJECT_ACCEPTANCE_MATERIAL": "项目验收_上传验收材料",
      "PROJECT_CONCLUSION": "项目结题申请",
      "PROJECT_ALTER": "项目变更申请"
  },
  "checkType": {
      "formality_review": "形式审查",
      "repetitive_review": "重复性审查",
      "credit_review": "信用审查"
  },
  "comprehensiveExportType_NOMINATION_LETTER_OVERVIEW": {
      "SAT_NOMINATION_LETTER_OVERVIEW": "江苏省科学技术奖",
      "BSC_NOMINATION_LETTER_OVERVIEW": "江苏省基础研究重大贡献奖",
      "YSC_NOMINATION_LETTER_OVERVIEW": "江苏省青年科技杰出贡献奖",
      "CTI_NOMINATION_LETTER_OVERVIEW": "江苏省企业技术创新奖",
      "IISC_NOMINATION_LETTER_OVERVIEW": "江苏省国际科学技术合作奖"
  },
  "positionLevel_nationalLevel_nationalLevel#2": {
      "nationalLevel#2#1": "国家实验室",
      "nationalLevel#2#2": "国家重点实验室",
      "nationalLevel#2#3": "国家工程技术研究中心",
      "nationalLevel#2#4": "国家临床医学研究中心",
      "nationalLevel#2#5": "国家技术创新中心",
      "nationalLevel#2#6": "国际联合研究中心",
      "nationalLevel#2#7": "一带一路联合实验室",
      "nationalLevel#2#8": "国家高端智库建设培育单位",
      "nationalLevel#2#9": "其他"
  },
  "projectTopicType": {
      "only_project": "项目",
      "project_and_topic": "项目+课题"
  },
  "evaluateResult": {
      "YES": "推荐",
      "NO": "不推荐",
      "FAIL": "弃权"
  },
  "techAdvancedLevel_higher": {
      "6": "6",
      "5": "5"
  },
  "template_code": {
      "modle_NBXX1720490162287091265687": "手动专家遴选提醒消息",
      "modle_NBXX1720490181680271675145": "专家查询提醒消息",
      "modle_NBXX1720490284810271859449": "回访表异常预警"
  },
  "ipStatus": {
      "invalid": "失效",
      "effective": "有效"
  },
  "task_complete_situation": {
      "2": "完成",
      "4": "未完成",
      "3": "基本完成",
      "5": "无",
      "1": "超额完成"
  },
  "awardNspExportType": {
      "all": "导出全部",
      "completed": "导出完成单位",
      "satTaskSource": "导出任务来源",
      "completedPerson": "导出完成人",
      "thesis": "导出主要论文著作"
  },
  "positionLevel_nationalLevel_nationalLevel#1": {
      "nationalLevel#1#1": "国家实验室",
      "nationalLevel#1#2": "国家重点实验室",
      "nationalLevel#1#3": "国家工程技术研究中心",
      "nationalLevel#1#4": "国家临床医学研究中心",
      "nationalLevel#1#5": "国家技术创新中心",
      "nationalLevel#1#6": "国际联合研究中心",
      "nationalLevel#1#7": "一带一路联合实验室",
      "nationalLevel#1#8": "国家高端智库建设培育单位",
      "nationalLevel#1#9": "其他"
  },
  "process_type_expert": {
      "PROCESS_IMPORT_DIRECTIONAL": "专家库定向邀请导入",
      "ADD_BIND_UNIT": "新增绑定单位",
      "LIST_IMPORT": "提交的专家导入申请",
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      "PROCESS_PASSIVE_OUTBOUND": "专家库被动出库申请",
      "PROCESS_IMPORT_ADMIN": "家库管理员导入",
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门",
      "PROCESS_RECEIVED": "专家库入库申请",
      "PROCESS_RENEW": "专家库信息更新",
      "PROCESS_OUTBOUND": "专家库主动出库申请",
      "PROCESS_EXPERT_USE": "专家库使用申请",
      "PROCESS_IMPORT_EXCHANGE": "家库省外交换导入",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门"
  },
  "inspectPhase": {
      "project_implementation_phase": "项目执行阶段",
      "medium_term_inspect_phase": "中期检查阶段"
  },
  "otherHonors": {
      "otherHonors#1": "两院院士",
      "otherHonors#2": "国家最高科学技术奖获得者",
      "otherHonors#3": "“长江学者奖励计划”特聘（讲座）教授",
      "otherHonors#4": "国家高层次人才特殊支持计划人选",
      "otherHonors#5": "国家海外高层次人才引进计划人选",
      "otherHonors#6": "国家科技重大专项技术总师、副总师、项目负责人",
      "otherHonors#7": "国家重点研发计划项目、原科技部863、973和科技支撑计划项目、国家重大工程项目首席科学家",
      "otherHonors#8": "国家杰出青年基金获得者",
      "otherHonors#9": "国家自然科学奖、国家技术发明奖、国家科学技术进步奖特等奖、一等奖、二等奖前3完成人",
      "otherHonors#10": "省级以上公共创新平台负责人",
      "otherHonors#11": "国家优秀青年基金获得者、“长江学者奖励计划”青年学者、国家高层次人才特殊支持计划青年拔尖人才、国家优秀青年科学基金（海外）获得者",
      "otherHonors#12": "无"
  },
  "nomineeDisciplineField_K": {
      "K1": "土木建筑",
      "K2": "水利工程",
      "K3": "交通运输工程"
  },
  "nomineeDisciplineField_J": {
      "J1": "环境科学与生态保护",
      "J2": "环保监测与技术",
      "J3": "资源开发利用",
      "J4": "安全生产技术"
  },
  "enterRecognizeSituation": {
      "high_technology_enterprise": "高新技术企业",
      "national_innovative_enterprise": "国家创新型企业",
      "provincial_innovative_enterprise": "省创新型企业",
      "provincial_private_technology_enterprise": "省民营科技企业",
      "other": "其他"
  },
  "nomineeDisciplineField_M": {
      "M1": "内科",
      "M2": "外科",
      "M3": "预防医学与公共卫生学",
      "M4": "中医"
  },
  "nomineeDisciplineField_L": {
      "L1": "农业",
      "L2": "林业",
      "L3": "养殖业"
  },
  "nomineeDisciplineField_G": {
      "G1": "新能源",
      "G2": "高效节能与减排",
      "G3": "动力电气"
  },
  "nomineeDisciplineField_F": {
      "F1": "生物技术",
      "F2": "药学",
      "F3": "医疗器械及材料"
  },
  "outboundReason": {
      "selfOut": "专家本人申请出库",
      "objective": "专家客观原因",
      "performanceEvaluation": "专家履职评价问题"
  },
  "nomineeDisciplineField_I": {
      "I1": "动力装备",
      "I2": "工程及矿山机械",
      "I3": "汽车及轨道交通装备",
      "I4": "海工船舶",
      "I5": "航天航空装备",
      "I6": "机器人及智能装备",
      "I7": "数控加工及精密模具",
      "I8": "仪器仪表"
  },
  "taxWorkDuration": {
      "10": "大于等于10年"
  },
  "nomineeDisciplineField_H": {
      "H1": "无机非金属材料",
      "H2": "有机高分子材料",
      "H3": "金属材料",
      "H4": "半导体材料",
      "H5": "化学工程"
  },
  "rewardType": {
      "natural_science": "自然科学奖",
      "progress": "科技进步奖"
  },
  "commissionDepartment": {
      "18720079773": "黎一 188****1114",
      "18720079774": "潘七 188****1115",
      "18039020160": "王一 188****1116"
  },
  "enterpriseBaseInfo": {
      "enterpriseName": "企业名称",
      "registerTime": "注册时间",
      "registerType": "注册类型",
      "foreignInvestPlace": "外资来源地",
      "registerFund": "注册资金",
      "belongIndustry": "所属行业",
      "enterpriseScale": "企业规模",
      "administrativeDivision": "行政区划",
      "organizationalCode": "组织机构代码/统一社会信用代码",
      "taxRegisterNumber": "税务登记号/统一社会信用代码",
      "competentTaxAuthorities": "企业所得税税务机关",
      "collectionMethod": "企业所得税征收方式",
      "address": "通信地址",
      "postCode": "邮政编码"
  },
  "chiefCheckShowStatus": {
      "0": "处长不可审",
      "1": "处长可审核",
      "2": "处长已审核"
  },
  "expertOperateType": {
      "received_proactively": "专家入库",
      "received_passive": "专家入库",
      "follow": "记为关注类",
      "unfollow": "取消关注类",
      "dishonesty": "加入失信名单",
      "paused": "暂停专家资格",
      "restore": "恢复资格",
      "outbound_proactively": "专家主动出库",
      "outbound_passive": "专家出库"
  },
  "transAbility_lower": {
      "12": "12",
      "11": "11",
      "10": "10",
      "9": "9",
      "8": "8",
      "7": "7"
  },
  "expertType_economist": {
      "economist#1": "国内知名会计师事务所熟悉科技经费管理工作的高级管理人员",
      "economist#2": "国内知名投资机构、金融机构熟悉科技创新工作的高级管理人员",
      "economist#3": "高等学校、科研院所、企业中熟悉科技经费管理的财务（审计）部门负责人",
      "economist#4": "银行、证券、保险、担保公司等大中型金融机构中具有科技金融管理工作经验的中级管理人员",
      "economist#5": "国内知名会计师事务所熟悉科技经费管理工作的中级管理人员",
      "economist#6": "以上均不是"
  },
  "expertDomain": {
      "disciplineField": "学科领域",
      "naturalScienceFoundationField": "国家自然科学基金领域",
      "industrialTechnologyField": "产业技术领域"
  },
  "enterpriseReviewStatusNew": {
      "toBeReviewed": "待评审",
      "reviewed": "已评审",
      "review_ing": "评审中",
      "undo_submit": "待提交"
  },
  "enterRegisterType_100": {
      "110": "国有企业",
      "120": "集体企业",
      "130": "股份合作企业",
      "140": "联营企业",
      "150": "有限责任公司",
      "160": "股份有限公司",
      "170": "私营企业",
      "190": "其他企业"
  },
  "smsFeedbackStatus": {
      "unConfirmed": "待回复",
      "attend": "确认参评",
      "timeout": "超时未回复",
      "reject": "已拒绝"
  },
  "totalReviewStatus": {
      "toBeCommit": "组员未提交",
      "toBeReviewed": "待评审",
      "toBeTotalReviewed": "待综合评审",
      "commit": "已提交"
  },
  "nominationType": {
      "personal_nomination": "人选提名",
      "organization_nomination": "组织提名"
  },
  "nomineeDisciplineField_A_A2": {
      "A2_1": "系统学",
      "A2_2": "通信原理",
      "A2_3": "模式识别",
      "A2_4": "仿真建模原理",
      "A2_5": "人工智能基础理论",
      "A2_6": "区块链基础原理",
      "A2_7": "信息安全基础理论",
      "A2_8": "自动控制理论",
      "A2_9": "工程控制论",
      "A2_10": "鲁棒控制",
      "A2_11": "导航",
      "A2_12": "制导与控制",
      "A2_13": "智能自动化理论"
  },
  "positionLevel_provincialLevel_provincialLevel#1": {
      "provincialLevel#1#1": "省实验室",
      "provincialLevel#1#2": "省级重点实验室",
      "provincialLevel#1#3": "省级临床医学研究中心",
      "provincialLevel#1#4": "省技术创新中心",
      "provincialLevel#1#5": "省级重点企业研究院",
      "provincialLevel#1#6": "在省编办登记注册的新型研发机构",
      "provincialLevel#1#7": "省级重点高端智库",
      "provincialLevel#1#8": "其他"
  },
  "nomineeDisciplineField_A_A1": {
      "A1_1": "基础及应用数学",
      "A1_2": "数理统计学",
      "A1_3": "运筹学",
      "A1_4": "计算科学",
      "A1_5": "加密算法"
  },
  "nomineeDisciplineField_A_A4": {
      "A4_1": "理论物理",
      "A4_2": "声学",
      "A4_3": "热学",
      "A4_4": "光学",
      "A4_5": "电磁学",
      "A4_6": "凝聚态物理",
      "A4_7": "等离子体物理"
  },
  "positionLevel_provincialLevel_provincialLevel#2": {
      "provincialLevel#2#1": "省实验室",
      "provincialLevel#2#2": "省级重点实验室",
      "provincialLevel#2#3": "省级临床医学研究中心",
      "provincialLevel#2#4": "省技术创新中心",
      "provincialLevel#2#5": "省级重点企业研究院",
      "provincialLevel#2#6": "在省编办登记注册的新型研发机构",
      "provincialLevel#2#7": "省级重点高端智库",
      "provincialLevel#2#8": "其他"
  },
  "introductionProperties": {
      "A": "全职",
      "B": "兼职"
  },
  "nomineeDisciplineField_A_A3": {
      "A3_1": "理论力学",
      "A3_2": "固体力学",
      "A3_3": "流体力学",
      "A3_4": "结构力学",
      "A3_5": "工程力学",
      "A3_6": "土木建筑基础理论",
      "A3_7": "水力学及水沙动力学",
      "A3_8": "水工材料与结构",
      "A3_9": "地震学",
      "A3_10": "安全系统学"
  },
  "font_type_new": {
      "jhzncx": "计划指南",
      "xqsxcx": "行权事项",
      "zcwjcx": "政策文件"
  },
  "shotCheckStatus": {
      "dealing": "处理中",
      "pass": "通过",
      "wait": "暂缓"
  },
  "nomineeDisciplineField_A_A5": {
      "A5_1": "天体力学",
      "A5_2": "天体测量学",
      "A5_3": "射电天文学",
      "A5_4": "空间天文学",
      "A5_5": "天体演化学",
      "A5_6": "星系与宇宙学"
  },
  "nomineeDisciplineField_I_I6": {
      "I6_1": "自动化制造装备",
      "I6_2": "制造执行系统（MES）",
      "I6_3": "工业机器人",
      "I6_4": "机器人核心零部件",
      "I6_5": "先进控制与设备",
      "I6_6": "通用机械技术与设备",
      "I6_7": "机器装配工艺",
      "I6_8": "流体机械技术与设备",
      "I6_9": "纺织机械装备"
  },
  "projectStatus": {
      "project_status_draft": "申报人填写中",
      "project_status_charge": "专员待受理",
      "project_pro_wait_audit": "待专业机构处长审核",
      "project_have_recall": "主管部门已撤回",
      "project_status_reception": "受理中心已受理",
      "project_status_declare": "已申报",
      "project_status_approval": "已立项",
      "project_status_conclude": "已结题",
      "project_returned": "已退回"
  },
  "nomineeDisciplineField_I_I5": {
      "I5_1": "飞行器结构与设计",
      "I5_2": "飞行机制造技术",
      "I5_3": "航空、航天推进系统",
      "I5_4": "航空、航天专用材料及零部件"
  },
  "nomineeDisciplineField_I_I8": {
      "I8_1": "仪器仪表技术",
      "I8_2": "工业自动化仪器",
      "I8_3": "电工仪器仪表",
      "I8_4": "光学仪器",
      "I8_5": "科学分析仪",
      "I8_6": "高精度检测仪器",
      "I8_7": "精密测控仪器仪表"
  },
  "nomineeDisciplineField_I_I7": {
      "I7_1": "数字化与智能化制造技术",
      "I7_2": "高端数控机床",
      "I7_3": "切削加工工艺与设备",
      "I7_4": "塑性加工工艺与设备",
      "I7_5": "精密与特种加工",
      "I7_6": "增材制造与激光加工",
      "I7_7": "3D打印技术",
      "I7_8": "极端机械制造技术",
      "I7_9": "精密模具"
  },
  "ruleModule": {
      "report_rule": "申报规则",
      "comprehensive_review_rule": "综合审查规则",
      "check_review_rule": "查重评审规则",
      "project_review_rule": "项目评审规则",
      "second_review_rule": "二次评审规则",
      "middle_review_rule": "中期评审规则",
      "spot_review_rule": "抽查评审规则",
      "acceptance_review_rule": "验收评审规则"
  },
  "nomineeDisciplineField_C": {
      "C1": "生物学",
      "C2": "农学与食品科学",
      "C3": "环境与生态科学"
  },
  "nomineeDisciplineField_B": {
      "B1": "化学",
      "B2": "材料科学"
  },
  "awardSituation": {
      "first_prize": "一等奖",
      "second_prize": "二等奖",
      "third_prize": "三等奖",
      "no_prize": "未获奖",
      "dealing_prize": "-"
  },
  "nomineeDisciplineField_E": {
      "E1": "网络与通信",
      "E2": "计算机与软件",
      "E3": "人工智能",
      "E4": "集成电路",
      "E5": "微电子及元器件"
  },
  "intelPropertyNum_higher": {
      "6": "6",
      "5": "5"
  },
  "nomineeDisciplineField_D": {
      "D1": "病理学",
      "D2": "药理学",
      "D3": "诊断学",
      "D4": "治疗理论与方法"
  },
  "nomineeDisciplineField_I_I2": {
      "I2_1": "工程机械装备",
      "I2_2": "轨道交通装备",
      "I2_3": "能源与动力装备",
      "I2_4": "冶金装备",
      "I2_5": "煤炭与矿山装备"
  },
  "expertType": {
      "technology": "科技专家",
      "industry": "产业专家",
      "economist": "经济专家"
  },
  "nomineeDisciplineField_I_I1": {
      "I1_1": "汽车发动机",
      "I1_2": "内燃机工程",
      "I1_3": "蒸汽工程",
      "I1_4": "涡轮机械",
      "I1_5": "高性能电机",
      "I1_6": "液压传动装备",
      "I1_7": "微动力工程"
  },
  "nomineeDisciplineField_A": {
      "A1": "数学",
      "A2": "信息学与控制科学",
      "A3": "力学",
      "A4": "物理学",
      "A5": "天文学"
  },
  "nomineeDisciplineField_I_I4": {
      "I4_1": "海洋工程装备",
      "I4_2": "海上勘探平台",
      "I4_3": "船舶工程",
      "I4_4": "造船专用工艺",
      "I4_5": "船舶关键零部件及配套设备"
  },
  "nomineeDisciplineField_I_I3": {
      "I3_1": "车辆工程",
      "I3_2": "汽车零部件及整车装配技术",
      "I3_3": "智能网联汽车",
      "I3_4": "新能源汽车",
      "I3_5": "铁路机车及零部件",
      "I3_6": "城轨车辆系统"
  },
  "PopMsgTypeEnum": {
      "BIND_PERSON_MANAGER_OLD_ACCOUNT": "个人账号绑定",
      "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门",
      "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号"
  },
  "UserBindUnitRoleNewEnum": {
      "super_admin": "超级管理员",
      "member": "成员"
  },
  "OldSysUserBindStateEnum": {
      "0": "待绑定",
      "1": "绑定中",
      "2": "绑定成功"
  },
  "UserBindUnitRoleEnum": {
      "unit_manager": "管理员",
      "unit_user": "成员"
  },
  "BizSystemTypeForUserEnum": {
      "1": "江苏省科技计划管理信息平台",
      "2": "科学技术奖励"
  },
  "OldSysUserTypeEnum": {
      "0": "默认",
      "1": "单位管理员",
      "2": "系统管理员"
  },
  "BizSystemTypeEnum": {
      "1": "江苏省科技计划管理信息平台",
      "2": "科学技术奖励",
      "3": "高新企业技术认定"
  },
  "UserTypeEnum": {
      "person": "个人",
      "legal": "法人"
  },
  "FlowTaskApproveResEnum": {
      "AGREE": "同意",
      "DISAGREE": "拒绝",
      "SKIP": "跳过",
      "RECALL": "回退"
  }
}

const useGetDict = ({ dictKey, dict }: UseGetDictType) => {
  const { globalDict: latestDict } = useContext(ConfigContext);
  const globalDict = { ...DICT, ...latestDict };  // 组件库开发时，因为没有调字典接口，所以用代码中存的DICT兜底；注册页面没有调字典接口，所以用DICT兜底

  const dictData = useMemo(() => {
    if (keys(dict ?? {})?.length) return dict;

    {/* @ts-ignore */ }
    if (dictKey && globalDict?.[dictKey]) return globalDict?.[dictKey];

    return {};
  }, [globalDict, dictKey, dict]);

  return {
    dictData,
  };
};

export default useGetDict;
