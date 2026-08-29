---
title: Error Handling & Retries
---

# Error Handling & Retries

Since error handling and knowing when it is safe to retry a failed request is unique to each carrier, we do *not* automatically retry failed requests from shipping integrations.

We recommend that each integration implement error handling and / or retry as needed per carrier requirements:

- Validation errors - i.e. something where the user can make a correction and try again - should be communicated as throwing a `BadRequestError` containing a user-friendly error message explaining the nature of the error.
- External carrier server errors (typically HTTP status code 500 and above) - if the carrier returns a server error you can most likely wait and retry the request, depending on the circumstances and/or how the carrier handles error conditions. For instance if you find that they return validation errors as server errors then you should not retry those and rather throw a `BadRequestError` as described above.
- Rate limiting errors (typically HTTP status code 429) - if the carrier is returning errors indicating that you have reached a rate limit in terms of how frequently you can make requests we recommend retrying the request while adhering to whatever rules the carrier dictates - i.e. if they are telling you to retry after a certain amount of time make sure you wait that long before trying again.

## Implementing Retries

Depending on how you are making requests to the carrier, there may be retry capabilities built into the library you're using or available as supplemental packages. For the [Axios](https://axios-http.com/) library a common solution is the [axios-retry](https://www.npmjs.com/package/axios-retry) plugin, for instance.

While retrying failed requests inside your integration can lead to a better user experience in those cases where a request could succeed after retrying it, keep in mind that this strategy will result in longer wait times for users trying to use your integration in the event that failures are occurring.

A good starting point would be to retry requests no more than two or three times and use an exponential backoff strategy to determine how long to wait between attempts. If you were to wait 100ms after the first attempt, the second attempt would be 200ms, and so on. After retries are exhausted and issues are still occurring then you should throw an `ExternalServerError` with an appropriate message to notify the user that the carrier is experiencing issues and they should try again later.
