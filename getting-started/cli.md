---
title: ShipEngine Connect CLI
---
# ShipEngine Connect CLI
## Installing
You can install the Connect CLI tool by running the following command from your terminal:

```bash
npm install --global @shipengine/connect
```

After the installation has been completed you can test to make sure it is working by running:
```bash
shipengine-connect --version
```

## Log In
:::warning Api KEY
In order to publish, deploy, and test in our hosted environment you will need
a ShipEngine _Connect_ API Key.<br/>
**This is not the same as a ShipEngine API Key, which is used to make requests
to the ShipEngine APIs** <br/>

Please contact the [ShipEngine Connect Team](mailto:connect@shipengine.com)
to obtain a ShipEngine Connect API Key.
:::
You can then use the command:

```
shipengine-connect login
```

and you will be prompted to enter your API Key:

```
shipengine-connect login
Please enter your API key: [] 
```

After entering your API key and hitting Enter you should see a successful login message:

```
shipengine-connect login
Please enter your API key: **************************
Verifying account... done
You have logged in with a Connect API key
```
