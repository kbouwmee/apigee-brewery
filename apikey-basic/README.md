# Validate API keys and enforce quotas

### Sample use case

Validate an API key and enforce a quota based on values set in an API product.

### Policies 

This sample uses these policies: 

* ![alt text](../../images/icon-policy-security.jpg "API Key policy") API Key: To validate an API key in the request, and populate a set of flow variables used by the Quota policy. 
* ![alt text](../../images/icon-policy-quota.jpg "Quota policy") Quota: To enforce quota on incoming requests. 
* ![alt text](../../images/icon-assign-message.jpg "Assign Message policy") Assign Message: To remove the API key parameter from the request flow. 

### About

This sample demonstrates a commonly used, and often misunderstood, behavior of Apigee Edge. When you create an Edge product, you can set quota values that specify how many API calls can be made in a time period (like 10 requests per second). However, you may be surprised to find out configuring these settings do NOT actually enforce a quota!

Quotas are only enforced when a Quota policy is added to a proxy. If you specify quota values in a product, those values are used to populate flow variables that are accessible in your proxy flow, and you can then use these variables in a Quota policy.

The key to remember is that these variables are only populated under specific circumstances, and one of them is when an API key is validated. 

For example, if you have a VerifyAPIKey policy named VerifyKey, the following variables will be populated upon verification of a key with the Quota fields set as 10 requests per 1 second:

```
verifyapikey.VerifyKey.apiproduct.developer.quota.limit = 10
verifyapikey.VerifyKey.apiproduct.developer.quota.interval = 1
verifyapikey.VerifyKey.apiproduct.developer.quota.timeunit = second
```

You can then set the Quota policy like this:

```
<Quota name="CheckQuota"> 
  <Interval ref="verifyapikey.ValidateAPIKey.apiproduct.developer.quota.interval"/>
  <TimeUnit ref="verifyapikey.ValidateAPIKey.apiproduct.developer.quota.timeunit"/>
  <Allow countRef="verifyapikey.ValidateAPIKey.apiproduct.developer.quota.limit"/>
  <Identifier ref="request.queryparam.apikey"/>
</Quota>
```

This policy also has the <Identifier> element, which tells the policy to only apply the quota against calls made with the validated API key. Otherwise, all API calls will count against the quota. 

The flow of the sample goes like this:

1. A request comes in to Apigee Edge - something like this:

    `curl "http://myorg-test.apigee.net/mocktarget_key/json?apikey=abc123"``

2. A VerifyApiKey policy checks the `apikey` parameter. If it's valid, product-related flow variables are set and the call proceeds, or else an error is returned. 
3. A Quota policy executes, with quota values set based on the API key flow variables. 
4. An Assign Message policy executes to remove the `apikey` parameter from the request. Otherwise, it would be passed on to the back-end target. This step is considered a best practice. 

### More information

**Policy used in this sample**

* [Verify API Key policy](http://apigee.com/docs/api-services/reference/verify-api-key-policy)
* [Quota policy](http://apigee.com/docs/api-services/reference/quota-policy)
* [Assign Message policy](http://apigee.com/docs/api-services/reference/xml-json-policy)

**Related policies**
* [Spike Arrest policy](http://apigee.com/docs/api-services/reference/spike-arrest-policy)

### Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

# apigee-deploy-apikey-basic

Simple API Proxy that demonstrates APIkey policy.
Deploy to your org with one click.

<a href="https://deploynow.apigee.com/login-form/?repo=https://github.com/kbouwmee/apigee-brewery.git&apiFolder=apikey-basic/&makeScript=make.sh">
<img src="https://raw.githubusercontent.com/apigee/apigee-deploy-now/master/images/deploy_to_apigee.png" align="left" height="45" width="232" >
</a>
<br/>
<br/>
---

Copyright © 2016 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
