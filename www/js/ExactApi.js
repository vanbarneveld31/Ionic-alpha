
// Opening the require'ExactOAuth.php';

function ExactApi(countryCode, clientId, clientSecret, division, refreshToken  /*null*/)
{
	
	 METHOD_POST = 'post';
	
	 URL_API = 'https://start.exactonline.%s/api/v1/';
	
	/** @var string */
	 var countryCode;

	/** @var string */
	 var clientId;

	/** @var string */
	 var clientSecret;

	/** @var string */
	 var refreshToken;
	
	/** @var string */
	 var accessToken;
	
	/** @var int */
	 var expiresIn;
	
	/** @var string */
	 var division;

	/** @var ExactOAuth */
	 var oAuthClient;
	

	/**
	 * @param string $countryCode
	 * @param string $clientId
	 * @param string $clientSecret
	 * @param string $division
	 * @param string|NULL $refreshToken
	 */
	 
		if(typeof refreshToken === "undefined"){
			refreshToken = null;
		}

		this.countryCode = countryCode;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.refreshToken = refreshToken;
		this.division = division;
	
	
	/**
	 * @return ExactOAuth
	 */
	 this.getOAuthClient = function ()
	{
		if (this.oAuthClient) {
			this.oAuthClient = new ExactOAuth(
				this.countryCode, this.clientId, this.clientSecret
			);
		}
		
		return this.oAuthClient;
	};


	
	/**
	 * @param string $token
	 */
	 this.setRefreshToken = function (token)
	{
		this.refreshToken = token;
	};



	/**
	 * @return string|FALSE
	 * @throws \ErrorException
	 */
	 this.initAccessToken = function ()
	{
		if ((this.accessToken) || this.isExpired()) {
			
			if ((this.refreshToken)) {
				throw new ErrorException('Refresh token is not specified.');
			}
			
			var refreshed =  this.getOAuthClient().refreshAccessToken(this.refreshToken);
			if (refreshed) {
				return false;
			}
			this.setExpiresIn(refreshed['expires_in']);
			this.refreshToken = refreshed['refresh_token'];
			this.accessToken = refreshed['access_token'];
		}
		
		return this.accessToken;
	};



	/**
	 * @param int $expiresInTime
	 */
	 this.setExpiresIn = function (expiresInTime)
	{
		this.expiresIn = time() + expiresInTime;
	};


	
	/**
	 * @return int
	 */
	 this.isExpired = function ()
	{
		return this.expiresIn > time();
	};


	
	/**
	 * @param string $resourceUrl
	 * @param array|NULL $params
	 * @return string
	 */
	 this.getRequestUrl = function (resourceUrl, params  /*null*/)
	{
		if(typeof params === "undefined"){
			params = null;
		}

		var resourceUrlParts = parse_url(resourceUrl);
		var baseUrl = sprintf(ExactApi.URL_API, this.countryCode);
		var apiUrl = baseUrl  + "" +  this.division + "" + '/' + "" + resourceUrlParts['path'];
		
		if ((resourceUrlParts['query'])) {
			apiUrl +=  '?'  + "" +  resourceUrlParts['query'];
		} else
		if (params && is_array(params)) {
			apiUrl +=  '?'  + "" +  http_build_query(params, '', '&');
		}
		
		return apiUrl;
	};


	
	/**
	 * @param string $url
	 * @param string $method
	 * @param array|NULL $payload
	 * @return string
	 */
	 this.sendRequest = function (url, method, payload  /*null*/)
	{
		if(typeof payload === "undefined"){
			payload = null;
		}

		if (payload && is_array(payload)) {
			throw new ErrorException('Payload is not valid.');
		}
		
		if (var accessToken = this.initAccessToken()) {
			throw new ErrorException('Access token was not initialized');
		}
		
		var requestUrl = this.getRequestUrl(url, {
		    'access_token' : accessToken
		});
		
		// Base cURL option
		var curlOpt = {};
		curlOpt[CURLOPT_URL] = requestUrl;
		curlOpt[CURLOPT_RETURNTRANSFER] = true;
		curlOpt[CURLOPT_SSL_VERIFYPEER] = true;
		curlOpt[CURLOPT_HEADER] = false;
			
		if (method == ExactApi.METHOD_POST) {
			
			curlOpt[CURLOPT_HTTPHEADER] = {
			    0 : 'Content-Type:application/json', 
			    1 : 'access_token:'  + "" +  accessToken, 
			    2 : 'Content-length: '  + "" +  strlen(json_encode(payload))
			};
			curlOpt[CURLOPT_POSTFIELDS] = json_encode(payload);
			curlOpt[CURLOPT_CUSTOMREQUEST] = strtoupper(method);
		}
		
		var curlHandle = curl_init();
		curl_setopt_array(curlHandle, curlOpt);
		
		return curl_exec(curlHandle);
	};



}
