function ExactOAuth(countryCode, clientId, clientSecret)
{
	
	 URL_AUTH = 'https://start.exactonline.%s/api/oauth2/auth';
	 URL_TOKEN = 'https://start.exactonline.%s/api/oauth2/token';
	
	 GRANT_AUTHORIZATION_CODE = 'authorization_code';
	 GRANT_REFRESH_TOKEN = 'refresh_token';
	
	 RESPONSE_TYPE_CODE = 'code';
	
	var clientId;
	var clientSecret;
	var countryCode;
	var redirectUri;
	 

	/**
	 * @param string $countryCode
	 * @param string $clientId
	 * @param string $clientSecret
	 */
	 
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.countryCode = countryCode;
	

	/**
	 * @param string|NULL $redirectUri
	 * @param string $responseType
	 * @return string
	 * @throws \ErrorException
	 */
	 this.getAuthenticationUrl = function (redirectUri  /*null*/, responseType  ExactOAuth./*RESPONSE_TYPE_CODE*/)
	{
		if(typeof redirectUri === "undefined"){
			redirectUri = null;
		}

		if(typeof responseType === "undefined"){
			responseType = RESPONSE_TYPE_CODE;
		}

		if ((this.redirectUri) && (redirectUri)) {
			throw new ErrorException('Redirect Uri is not specified.');
		}
		
		var params = {
		    'client_id' : this.clientId,
		    'redirect_uri' : redirectUri  redirectUri : this.redirectUri,
		    'response_type' : responseType
		};

		var url = sprintf(ExactOAuth.URL_AUTH, this.countryCode);

		return url  + "" +  '?'  + "" +  http_build_query(params, '', '&');
	};



	/**
	 * @param string $code
	 * @param string|NULL $redirectUri
	 * @param string $grantType
	 * @return array {access_token, token_type, expires_in, refresh_token}
	 * @throws \ErrorException
	 */
	 this.getAccessToken = function (code, redirectUri  /*null*/, grantType  ExactOAuth./*GRANT_AUTHORIZATION_CODE*/)
	{
		if(typeof redirectUri === "undefined"){
			redirectUri = null;
		}

		if(typeof grantType === "undefined"){
			grantType = GRANT_AUTHORIZATION_CODE;
		}

		if ((this.redirectUri) && (redirectUri)) {
			throw new ErrorException('Redirect Uri is not specified.');
		}
		
		var params = {
		    'code' : code,
		    'client_id' : this.clientId,
		    'grant_type' : grantType,
		    'client_secret' : this.clientSecret,
		    'redirect_uri' : redirectUri  redirectUri : this.redirectUri,
		};

		var url = sprintf(ExactOAuth.URL_TOKEN, this.countryCode);

		return this.getResponse(url, params);
	};



	/**
	 * @param string $refreshToken
	 * @return array {access_token, expires_in, refresh_token}
	 */
	 this.refreshAccessToken = function (refreshToken)
	{
		var params = {
		    'refresh_token' : refreshToken,
		    'grant_type' : ExactOAuth.GRANT_REFRESH_TOKEN,
		    'client_id' : this.clientId,
		    'client_secret' : this.clientSecret
		};
		
		var url = sprintf(ExactOAuth.URL_TOKEN, this.countryCode);
		
		return this.getResponse(url, params);
	};



	/**
	 * @param string $url
	 * @param array $params
	 * @return array|NULL
	 */
	 this.getResponse = function (url, params)
	{
		var ch = curl_init();
		curl_setopt(ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt(ch, CURLOPT_URL, url);
		curl_setopt(ch, CURLOPT_SSL_VERIFYPEER, true);
		curl_setopt(ch, CURLOPT_POST, 1);
		curl_setopt(ch, CURLOPT_POSTFIELDS, http_build_query(params, '', '&'));
		var result = curl_exec(ch);

		var decodedResult = json_decode(result, true);
		
		if ((decodedResult['error'])) {
			return false;
		}
		
		return decodedResult;
	};


	
	/**
	 * @param string $uri
	 */
	 this.setRedirectUri = function (uri)
	{
		this.redirectUri = uri;
	};



}


ExactOAuth.prototype.clientId = null;
ExactOAuth.prototype.clientSecret = null;
ExactOAuth.prototype.countryCode = null;
ExactOAuth.prototype.redirectUri = null;
