Thoughts
========


Questions
---------
* For a Pickup service it seems that the shipment needs to reference a delivery service, how do I know if a delivery
service supports pickups?


apps:new
--------
* Not sure I like the `apps-new.ts` having to known about each file to copy it from the source to the destination context, will that get a bit unmanegable as we add more files/examples/app-types?
  * At least split each out into a separate file?


apps
-----
Is listing the apps the best default behavior? Or would it be better served as apps:list?


app-auth
---------
- When a user logs in, we prompt for the api key to make sure that it's valid and then store it in .netrc
- api key should be _base58 encoding ex. (api_(base58_encoded))
  * prefix key should be 2-4 characters
- .netrc structure?


app-publish
-----------
### TODO
- Apps will only ever have one deployment at a time.
  - How to check for the latest deployment status.
- Research best practice for `.netrc`, needs to be able to handle multiple logins/users.
- Reach out to Justin about SE errors and error codes
- Hardcode the base url for now?

### Questions
* Overall is there any type of format or style that we want to enforce for the CLI? (color scheme for success, info, error messages)


### Notes
https://dip-dx-test-1.kubedev.sslocal.com/appinfo
