<?php
declare(strict_types=1);

// GregorianLunarCalendar SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GregorianLunarCalendarUtility::setRegistrar(function (GregorianLunarCalendarUtility $u): void {
    $u->clean = [GregorianLunarCalendarClean::class, 'call'];
    $u->done = [GregorianLunarCalendarDone::class, 'call'];
    $u->make_error = [GregorianLunarCalendarMakeError::class, 'call'];
    $u->feature_add = [GregorianLunarCalendarFeatureAdd::class, 'call'];
    $u->feature_hook = [GregorianLunarCalendarFeatureHook::class, 'call'];
    $u->feature_init = [GregorianLunarCalendarFeatureInit::class, 'call'];
    $u->fetcher = [GregorianLunarCalendarFetcher::class, 'call'];
    $u->make_fetch_def = [GregorianLunarCalendarMakeFetchDef::class, 'call'];
    $u->make_context = [GregorianLunarCalendarMakeContext::class, 'call'];
    $u->make_options = [GregorianLunarCalendarMakeOptions::class, 'call'];
    $u->make_request = [GregorianLunarCalendarMakeRequest::class, 'call'];
    $u->make_response = [GregorianLunarCalendarMakeResponse::class, 'call'];
    $u->make_result = [GregorianLunarCalendarMakeResult::class, 'call'];
    $u->make_point = [GregorianLunarCalendarMakePoint::class, 'call'];
    $u->make_spec = [GregorianLunarCalendarMakeSpec::class, 'call'];
    $u->make_url = [GregorianLunarCalendarMakeUrl::class, 'call'];
    $u->param = [GregorianLunarCalendarParam::class, 'call'];
    $u->prepare_auth = [GregorianLunarCalendarPrepareAuth::class, 'call'];
    $u->prepare_body = [GregorianLunarCalendarPrepareBody::class, 'call'];
    $u->prepare_headers = [GregorianLunarCalendarPrepareHeaders::class, 'call'];
    $u->prepare_method = [GregorianLunarCalendarPrepareMethod::class, 'call'];
    $u->prepare_params = [GregorianLunarCalendarPrepareParams::class, 'call'];
    $u->prepare_path = [GregorianLunarCalendarPreparePath::class, 'call'];
    $u->prepare_query = [GregorianLunarCalendarPrepareQuery::class, 'call'];
    $u->result_basic = [GregorianLunarCalendarResultBasic::class, 'call'];
    $u->result_body = [GregorianLunarCalendarResultBody::class, 'call'];
    $u->result_headers = [GregorianLunarCalendarResultHeaders::class, 'call'];
    $u->transform_request = [GregorianLunarCalendarTransformRequest::class, 'call'];
    $u->transform_response = [GregorianLunarCalendarTransformResponse::class, 'call'];
});
