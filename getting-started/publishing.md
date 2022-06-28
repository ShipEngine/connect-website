---
title: Publishing
---

# Publishing
## Publish Command
You can run the `shipengine-connect publish` command to publish your application to the testing environment.

![](./images/shipengine-connect-publish.png)

After your app is successfully published you will be given login credentials to a test instance of [ShipStation](https://ship-devss111.sslocal.com/).

## Logging
:::info Note
Every publish will reset the logs that you can acquire from the logs command.
:::
You can then begin testing your application within shipstation. All logs your module makes in this test environment can be viewed by using the `logs` command.

**Write running integrations logs to terminal**
```
shipengine-connect logs
```

**Write running integrations logs to file**
```
shipengine-connect logs > logfile.log
```
