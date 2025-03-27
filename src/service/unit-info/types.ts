export interface UnitTaxReductionInfoRequest {
  /** 加计扣除额 */
  additionalDeductionAmount?: number;

  /** 加计扣除减免税额 */
  additionalDeductionTaxReductionAmount?: number;

  /** 创建时间 */
  createTime?: string;

  /** 逻辑删除标志，未删除-0，已删除-1 */
  deleteFlag?: number;

  /** 高新技术企业所得税减免额（万元） */
  highTechEnterTaxReductionAmount?: number;

  /** 自增主键 */
  id?: number;

  /** 其他科技政策减免税额（万元） */
  otherTechPolicyTaxReductionAmount?: number;

  /** 年度研发总投入 */
  researchDevelopmentTotal?: number;

  /** 企业落实科技政策减免税总额（万元） */
  taxReductionTotal?: number;

  /** 单位信息表id */
  unitId?: number;

  /** 更新时间 */
  updateTime?: string;

  /** 年度 */
  year?: string;
}

export interface UnitInfoVO {
  /** 通讯地址 */
  address?: string;

  /** 地区 */
  area?: string;

  /** 出生年月 */
  birthDate?: string;

  /** 认定证书编号 */
  certificationNumber?: string;

  /** 主管部门 */
  competentDepartment?: string;

  /** 控股方 */
  controlParty?: string;

  /** 法人联系方式 */
  corporateContact?: string;

  /** 法人身份证件号码 */
  corporateIdNumber?: string;

  /** 法人姓名 */
  corporateName?: string;

  /** 法人性别 */
  corporateSex?: string;

  /** 创建时间 */
  createTime?: string;

  /** 目前发展阶段 */
  currentDevelopmentStage?: string;

  /** 逻辑删除标志，未删除-0，已删除-1 */
  deleteFlag?: number;

  /** 企业认定情况 */
  enterRecognizeSituation?: string;

  /** 企业注册类型 */
  enterRegisterType?: string;

  /** 企业规模 */
  enterSize?: string;

  /** 成立时间 */
  establishmentTime?: string;

  /** 希望融资金额 */
  expectedFinancingAmount?: number;

  /** 希望融资类型 */
  expectedFinancingType?: string;

  /** 企业是否需要融资 */
  financingRequired?: string;

  /** 已获融资情况 */
  financingStatusObtained?: string;

  /** 自增主键 */
  id?: number;

  /** 主营业务所属产业领域 */
  industrialSector?: string;

  /** 是否在产业技术创新战略联盟 */
  industrialTechnologyInnovationStrategicAlliance?: string;

  /** 有关说明 */
  instruction?: string;

  /** 产学研重点合作单位 */
  keyCooperateUnit?: string;

  /** 上市代码 */
  listedCode?: string;

  /** 是否上市企业 */
  listedEnterprise?: string;

  /** 上市地区 */
  listedRegion?: string;

  /** 主要品牌 */
  mainBrand?: string;

  /** 主要产品 */
  mainProduct?: string;

  /** 是否在国家高新技术产业基地 */
  nationalHighTechIndustrialBase?: string;

  /** 是否在国家级高新区 */
  nationalHighTechZone?: string;

  /** 组织机构编码 */
  orgCode?: string;

  /** 组织机构代码 */
  organizationCode?: string;

  /** 邮政编码 */
  postalCode?: string;

  /** 申报年度的上年度数据--研发支出（万元） */
  previousDevelopExpense?: number;

  /** 研发支出占比（%） */
  previousDevelopExpenseProportion?: number;

  /** 研发人员（人） */
  previousDeveloper?: number;

  /** 其中：博士（人） */
  previousDoctor?: number;

  /** 聘用外籍研究人员（人） */
  previousHireForeignResearcher?: number;

  /** 引进“双创人才”（人） */
  previousInnovativeEntrepreneurialTalent?: number;

  /** 累计拥有发明专利数（件） */
  previousInventionPatentAccumulateNum?: number;

  /** 其中：发明专利申请数（件） */
  previousInventionPatentApplicationNum?: number;

  /** 其中：发明专利授权数（件） */
  previousInventionPatentAuthorizationNum?: number;

  /** 申报年度的上年度数据--主营业务收入（万元） */
  previousMainBusinessIncome?: number;

  /** 申报年度的上年度数据--净利润（万元） */
  previousNetProfit?: number;

  /** 累计拥有专利数（件） */
  previousPatentAccumulateNum?: number;

  /** 上年度专利申请数（件） */
  previousPatentApplicationNum?: number;

  /** 上年度专利授权数（件） */
  previousPatentAuthorizationNum?: number;

  /** 从业人员（人） */
  previousPractitioner?: number;

  /** 申报年度的上年度数据--产品销售收入（万元） */
  previousProductSalesIncome?: number;

  /** 申报年度的上年度数据--注册资本（万元） */
  previousRegisteredCapital?: number;

  /** 高级职称（人） */
  previousSeniorProfessionalTitle?: number;

  /** 申报年度的上年度数据--上缴税费总额（万元） */
  previousTaxTotal?: number;

  /** 技术改造支出（万元） */
  previousTechnicalRenovationExpense?: number;

  /** 技术引进支出（万元） */
  previousTechnologyIntroductionExpense?: number;

  /** 申报年度的上年度数据--总资产（万元） */
  previousTotalAssets?: number;

  /** 是否在省级现代农业科技示范园区 */
  provincialAgriculturalDemonstrationPark?: string;

  /** 是否在省级高新区 */
  provincialHighTechZone?: string;

  /** 是否在省级科技企业孵化器或加速器 */
  provincialIncubatorOrAccelerator?: string;

  /** 是否在省创新型市县 */
  provincialInnovativeCityAndCountry?: string;

  /** 是否在省创新型乡镇 */
  provincialInnovativeTownship?: string;

  /** 是否在省级科技产业园 */
  provincialScienceTechIndustrialPark?: string;

  /** 注册资本（万元） */
  registeredCapital?: number;

  /** 内部研发机构建设情况 */
  researchInstitutionDevelopment?: string;

  /** 企业落实科技减免税政策情况 */
  taxReductionInfoVOList?: UnitTaxReductionInfoVO[];

  /** 单位科技管理部门联系人职务 */
  techManageDuty?: string;

  /** Email */
  techManageEmail?: string;

  /** 单位科技管理部门联系人手机 */
  techManageMobilePhone?: string;

  /** 单位科技管理部门联系人姓名 */
  techManageName?: string;

  /** 单位科技管理部门联系人联系电话 */
  techManageTelephone?: string;

  /** 统一社会信用代码 */
  unifiedSocialCreditCode?: string;

  /** 单位名称 */
  unitName?: string;

  /** 单位类型 */
  unitType?: string;

  /** 更新时间 */
  updateTime?: string;
}

export interface UnitTaxReductionInfoVO {
  /** 加计扣除额 */
  additionalDeductionAmount?: number;

  /** 加计扣除减免税额 */
  additionalDeductionTaxReductionAmount?: number;

  /** 创建时间 */
  createTime?: string;

  /** 逻辑删除标志，未删除-0，已删除-1 */
  deleteFlag?: number;

  /** 高新技术企业所得税减免额（万元） */
  highTechEnterTaxReductionAmount?: number;

  /** 自增主键 */
  id?: number;

  /** 其他科技政策减免税额（万元） */
  otherTechPolicyTaxReductionAmount?: number;

  /** 年度研发总投入 */
  researchDevelopmentTotal?: number;

  /** 企业落实科技政策减免税总额（万元） */
  taxReductionTotal?: number;

  /** 单位信息表id */
  unitId?: number;

  /** 更新时间 */
  updateTime?: string;

  /** 年度 */
  year?: string;
}

export interface UnitInfoRequest {
  /** 通讯地址 */
  address?: string;

  /** 地区 */
  area?: string;

  /** 出生年月 */
  birthDate?: string;

  /** 认定证书编号 */
  certificationNumber?: string;

  /** 主管部门 */
  competentDepartment?: string;

  /** 控股方 */
  controlParty?: string;

  /** 法人联系方式 */
  corporateContact?: string;

  /** 法人身份证件号码 */
  corporateIdNumber?: string;

  /** 法人姓名 */
  corporateName?: string;

  /** 法人性别 */
  corporateSex?: string;

  /** 创建时间 */
  createTime?: string;

  /** 目前发展阶段 */
  currentDevelopmentStage?: string;

  /** 逻辑删除标志，未删除-0，已删除-1 */
  deleteFlag?: number;

  /** 企业认定情况 */
  enterRecognizeSituation?: string;

  /** 企业注册类型 */
  enterRegisterType?: string;

  /** 企业规模 */
  enterSize?: string;

  /** 成立时间 */
  establishmentTime?: string;

  /** 希望融资金额 */
  expectedFinancingAmount?: number;

  /** 希望融资类型 */
  expectedFinancingType?: string;

  /** 企业是否需要融资 */
  financingRequired?: string;

  /** 已获融资情况 */
  financingStatusObtained?: string;

  /** 自增主键 */
  id?: number;

  /** 主营业务所属产业领域 */
  industrialSector?: string;

  /** 是否在产业技术创新战略联盟 */
  industrialTechnologyInnovationStrategicAlliance?: string;

  /** 有关说明 */
  instruction?: string;

  /** 产学研重点合作单位 */
  keyCooperateUnit?: string;

  /** 上市代码 */
  listedCode?: string;

  /** 是否上市企业 */
  listedEnterprise?: string;

  /** 上市地区 */
  listedRegion?: string;

  /** 主要品牌 */
  mainBrand?: string;

  /** 主要产品 */
  mainProduct?: string;

  /** 是否在国家高新技术产业基地 */
  nationalHighTechIndustrialBase?: string;

  /** 是否在国家级高新区 */
  nationalHighTechZone?: string;

  /** 组织机构编码 */
  orgCode?: string;

  /** 组织机构代码 */
  organizationCode?: string;

  /** 邮政编码 */
  postalCode?: string;

  /** 申报年度的上年度数据--研发支出（万元） */
  previousDevelopExpense?: number;

  /** 研发支出占比（%） */
  previousDevelopExpenseProportion?: number;

  /** 研发人员（人） */
  previousDeveloper?: number;

  /** 其中：博士（人） */
  previousDoctor?: number;

  /** 聘用外籍研究人员（人） */
  previousHireForeignResearcher?: number;

  /** 引进“双创人才”（人） */
  previousInnovativeEntrepreneurialTalent?: number;

  /** 累计拥有发明专利数（件） */
  previousInventionPatentAccumulateNum?: number;

  /** 其中：发明专利申请数（件） */
  previousInventionPatentApplicationNum?: number;

  /** 其中：发明专利授权数（件） */
  previousInventionPatentAuthorizationNum?: number;

  /** 申报年度的上年度数据--主营业务收入（万元） */
  previousMainBusinessIncome?: number;

  /** 申报年度的上年度数据--净利润（万元） */
  previousNetProfit?: number;

  /** 累计拥有专利数（件） */
  previousPatentAccumulateNum?: number;

  /** 上年度专利申请数（件） */
  previousPatentApplicationNum?: number;

  /** 上年度专利授权数（件） */
  previousPatentAuthorizationNum?: number;

  /** 从业人员（人） */
  previousPractitioner?: number;

  /** 申报年度的上年度数据--产品销售收入（万元） */
  previousProductSalesIncome?: number;

  /** 申报年度的上年度数据--注册资本（万元） */
  previousRegisteredCapital?: number;

  /** 高级职称（人） */
  previousSeniorProfessionalTitle?: number;

  /** 申报年度的上年度数据--上缴税费总额（万元） */
  previousTaxTotal?: number;

  /** 技术改造支出（万元） */
  previousTechnicalRenovationExpense?: number;

  /** 技术引进支出（万元） */
  previousTechnologyIntroductionExpense?: number;

  /** 申报年度的上年度数据--总资产（万元） */
  previousTotalAssets?: number;

  /** 是否在省级现代农业科技示范园区 */
  provincialAgriculturalDemonstrationPark?: string;

  /** 是否在省级高新区 */
  provincialHighTechZone?: string;

  /** 是否在省级科技企业孵化器或加速器 */
  provincialIncubatorOrAccelerator?: string;

  /** 是否在省创新型市县 */
  provincialInnovativeCityAndCountry?: string;

  /** 是否在省创新型乡镇 */
  provincialInnovativeTownship?: string;

  /** 是否在省级科技产业园 */
  provincialScienceTechIndustrialPark?: string;

  /** 注册资本（万元） */
  registeredCapital?: number;

  /** 内部研发机构建设情况 */
  researchInstitutionDevelopment?: string;

  /** 企业落实科技减免税政策情况 */
  taxReductionInfoRequestList?: UnitTaxReductionInfoRequest[];

  /** 单位科技管理部门联系人职务 */
  techManageDuty?: string;

  /** Email */
  techManageEmail?: string;

  /** 单位科技管理部门联系人手机 */
  techManageMobilePhone?: string;

  /** 单位科技管理部门联系人姓名 */
  techManageName?: string;

  /** 单位科技管理部门联系人联系电话 */
  techManageTelephone?: string;

  /** 统一社会信用代码 */
  unifiedSocialCreditCode?: string;

  /** 单位名称 */
  unitName?: string;

  /** 单位类型 */
  unitType?: string;

  /** 更新时间 */
  updateTime?: string;
}
