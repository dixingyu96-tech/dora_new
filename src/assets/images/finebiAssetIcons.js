import analysisTheme from './agent-builtins/analysis_theme_bi.png'
import dashboard from './agent-builtins/dashboard_bi_catalog.png'
import dataset from './agent-builtins/dataset_bi_catalog.png'
import excelFile from './agent-builtins/excel_file_builtin.png'
import modelMetricSet from './agent-builtins/model_metrics_dataset.png'
import analysisSelfService from './connector-sources/bi_analysis_self_service.png'
import analysisStandard from './connector-sources/bi_analysis_standard.png'
import catalog from './connector-sources/bi_catalog.png'
import businessModelDirect from './connector-sources/business_model_direct.png'
import businessModelExtract from './connector-sources/business_model_extract.png'
import dbTableDirect from './connector-sources/db_table_direct.png'
import dbTableExtract from './connector-sources/db_table_extract.png'
import dimensionDirect from './connector-sources/dimension_direct.png'
import dimensionExtract from './connector-sources/dimension_extract.png'
import etlDirect from './connector-sources/etl_direct.png'
import etlExtract from './connector-sources/etl_extract.png'
import excelDirect from './connector-sources/excel_direct.png'
import excelExtract from './connector-sources/excel_extract.png'
import metricDirect from './connector-sources/metric_direct.png'
import metricExtract from './connector-sources/metric_extract.png'
import selfDatasetDirect from './connector-sources/self_dataset_direct.png'
import selfDatasetExtract from './connector-sources/self_dataset_extract.png'
import sqlExtract from './connector-sources/sql_extract_alt.png'
import sqlTableDirect from './connector-sources/sql_table_direct_alt.png'

// FineBI image ownership is centralized here. UI modules should consume these
// semantic keys instead of importing image files from the asset folders directly.
export const FINEBI_ASSET_ICONS = Object.freeze({
  builtins: Object.freeze({
    analysisTheme,
    dashboard,
    dataset,
    excelFile,
    modelMetricSet,
  }),
  sources: Object.freeze({
    analysisSelfService,
    analysisStandard,
    catalog,
    businessModelDirect,
    businessModelExtract,
    dbTableDirect,
    dbTableExtract,
    dimensionDirect,
    dimensionExtract,
    etlDirect,
    etlExtract,
    excelDirect,
    excelExtract,
    metricDirect,
    metricExtract,
    selfDatasetDirect,
    selfDatasetExtract,
    sqlExtract,
    sqlTableDirect,
  }),
})
