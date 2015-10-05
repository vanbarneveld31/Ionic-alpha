// Opening the require'ExactApi.php';

// Configuration, change these:
var clientId = '{b81cc4de-d192-400e-bcb4-09254394c52a}';
var clientSecret = 'n3G7KAhcv8OH';
var redirectUri = "https://www.mycompany.com/myapplication";
var division = "12345";

try {

	// Initialize ExactAPI
	var exactApi = new ExactApi('nl', clientId, clientSecret, division);

	exactApi.getOAuthClient().setRedirectUri(redirectUri);

	if ((var _GET['code'])) {

		// Redirect to Auth-endpoint
		var authUrl = exactApi.getOAuthClient().getAuthenticationUrl();
		header('Location: ' + "" + authUrl, true, 302);
		('Redirect');

	} else {

		// Receive data from Token-endpoint
		var tokenResult = exactApi.getOAuthClient().getAccessToken(_GET['code']);
		exactApi.setRefreshToken(tokenResult['refresh_token']);

		// List accounts
		var response = exactApi.sendRequest('crm/Accounts', 'get');
		var_dump(response);

		// // Create account
		// response = exactApi.sendRequest('crm/Accounts', 'post', {
		// 	'Status'			:	'C',
		// 	'IsSupplier'		:	True,
		// 	'Name'				:	'iWebDevelopment B.V.',
		// 	'AddressLine1'		:	'Ceresstraat 1',
		// 	'Postcode'			:	'4811CA',
		// 	'City'				:	'Breda',
		// 	'Country'			:	'NL',
		// 	'Email'				:	'info@iwebdevelopment.nl',
		// 	'Phone'				:	'+31(0)76-7002008',
		// 	'Website'			:	'www.iwebdevelopment.nl'

		// });
		var_dump(response);

	}

} catch ( /*ErrorException*/ e) {

	var_dump(e);

}