---
Scheduled Jobs
---

# Scheduled Jobs

Most of the functions you define within your app are invoked by the ShipEngine
Platform in response to user actions. However, it is possible to write functions
that are invoked on a schedule. This is useful for things like
[bulk import of tracking event data](../../shipping/tracking/#bulk-import).

To have a function in your app run on a regular basis, contact the
[ShipEngine Connect team](mailtoc:connect@shipengien.com) to set up a schedule.
You will need to specify the name of the function, and how often you want it
to run.

## Invocations

By default, a job will be invoked at the scheduled time, once per user connection.
Each separate invocation will be passed the credentials for a single user connection.
For example, if you have specified that your function should run hourly, and
there are 100 ShipEngine user's that have established connections to your app,
we will invoke your function 100 times every hour, or 2400 times a day.

You can override this behavior by defining a function in your app named `ScheduledFunction`.
The input for the function is an object that includes attributes for `api_code`
and `name`. It can also include any hardcoded arguments specified when the
schedule was created. For example, you might create one scheduled job to run
daily at 11PM, with the hardcoded parameter `"region" = "us"` and another
scheduled job to run daily at 5PM, with the hardcoded parameter `"region" = "eu"`.

Example input payload:
```
{
  "api_code": "my-connect-app",
  "name": "downloadUserActivity"
  "region": "eu"
}
```

Your `ScheduledFunction` implementation has to return an array of objects, where
each object represents the input to a single invocation. At the scheduled time,
your function will be invoked once for each object in the array, passing the
object as the input argument to your scheduled function. If you do not want
the function to be invoked at all at this time, return an empty array (`[]`). If you
want to fallback to the default behavior (one invocation per user connection),
return `null`.
