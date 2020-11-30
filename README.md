# Introduction
 
The Tableau plugin for GridDB makes it possible to access GridDB databases from [Tableau](https://www.tableau.com/why-tableau/what-is-tableau).

<br>
 
# Required software
 
* Tableau Desktop 2020.3 or later
* GridDB V4.3 or later

<br>

# How to install
1. Copy the GridDB JDBC driver
   Copy the GridDB JDBC driver (gridstore-jdbc-4.X.X.jar) to the following directory.

       C:\Program Files\Tableau\Drivers\

2. Copy the GridDB plugin file  

    Locate griddb_jdbc.taco in the following directory.

       C:\Users\[Windows User]\Documents\My Tableau Repository\Connectors

3. Run Tableau.exe with the following argument
   
     -DDisableVerifyConnectorPluginSignature=true

    
       "C:\Program Files\Tableau\Tableau 2020.3\bin\tableau.exe" -DDisableVerifyConnectorPluginSignature=true


<br>
 
# How to use
 
1. Select [To server] -> [Others] after running Tableau
 
2. Select [Toshiba GridDB JDBC]

3. Input GridDB information in the dialog

    Server: specify GridDB cluster information by the fixed list method  
    　(Example 1：192.168.10.10:20001)  
    　(Example 2：192.168.10.11:20001,192.168.10.12:20001,192.168.10.13:20001)  

    Username: specify a GridDB user name  
    Password: specify a GridDB password  
    ClusterName: specify a GridDB cluster name
    Database: specify a GridDB database name

4. Press the [Sign in] button     
<br>
     
# Note
 
Note 1: Limitations in the versions released until Tableau Desktop 2020.3.1.

 If there are multibyte characters in the path in which you specify where to locate the GridDB Tableau connector, an error occurs when you load the connector.
 As a result, it is not displayed on the Tableau screen.

 This issue will be fixed on Tableau 2020.3.2. 
 
 If you use an older version, follow the below guide.
  1. Change the path of griddb_jdbc.taco to a location without multibyte characters  
     (e.g. C:\tableau_taco)

  2. Run tableau.exe with the following additional argument  
     -DConnectPluginsPath=[the path where griddb_jdbc.taco is located]
     (e.g. -DConnectPluginsPath="C:\tableau_taco")

```bash
"C:\Program Files\Tableau\Tableau 2020.3\bin\tableau.exe" -DDisableVerifyConnectorPluginSignature=true -DConnectPluginsPath="C:\tableau_plugin"
```
<br>

# Limitations
 
- Join condition

  You can not use the Right Join and the Full Join statements.

- Filter

  The below conditions, which you can specify when you select [Conditions] of a filter, can not be used.  
  [Median] [Percentile] [Sample standard deviation] [Population standard deviation] [Sample variance] [Population variance] 
  
- Column of TIMESTAMP type  
  If you choose TIMESTAMP type columns as [Row] and [Column], you can use the options like [Quater Second quater], [April May], etc., whereas you can not use the options like [Quater 2015 second quater], [April 2015 May], etc.


 # File structure
- This software contains the below files:
  - connectionBuilder.js   
    The script file creating a JDBC destination URL.
  - connection-fields.xml   
    The file in which connection dialog fields are saved.
  - connection-metadata.xml   
    The file in which the fields related to database, scheme, and table metadata of the screen opened after connection are saved.
  - connectionProperties.js   
    The file used when opening a JDBC connection. A username and a password are saved.
  - connectionResolver.tdr   
    The file in which vendor unique parameters are saved.
  - dialect.tdd   
    The file in which SQL dialect is saved.
  - manifest.xml   
    The file in which the connector name is saved. Tableau uses the name to add it to the list of available connectors in the UI.

# (For your reference) How to create a taco file
- Required software to create a taco file
  - Python 3.7.3 or later
  - Java JDK
  - git

- How to create a taco file

  Please take a look at "Package and Sign Your Connector for Distribution"  
  [https://tableau.github.io/connector-plugin-sdk/docs/package-sign](https://tableau.github.io/connector-plugin-sdk/docs/package-sign) to see the detail.

The procedure to create a taco file on an Windows OS is as below:

1. Clone the repository of Tableau Connector SDK  
  Clone the repository of Tableau Connector SDK by git.
   ```
   git clone https://github.com/tableau/ connector-plugin-sdk.git
   ```

2. Create an virtual environment by venv  
  Create an virtual environment where a procedure that creates an taco file by venv is done.  
  At first, move to the connector-packager folder created by the clone command in the command prompt.  
   ```
   Example)
   cd connector-plugin-sdk\connector-packager
   ``` 

   Create a new environment and activate it.
   ```
   python -m venv .venv
   .\.venv\Scripts\activate 
   ``` 
3. Install required modules  
  Install required modules needed to create a taco file.
   ```
   python setup.py install
   ```

4. Create a taco file
  Create a taco file.
   ```
   python -m connector_packager.package [The file path of connection-fields.xml, connectionBuilder.js, etc.] --dest [Taco file output path] -l [Log file output path]
   ```
   
   The taco file and the log file are output in the destination path.
   

# Community
  * Issues  
    Use the GitHub issue function if you have any requests, questions, or bug reports. 
  * PullRequest  
    Use the GitHub pull request function if you want to contribute code.
    You'll need to agree GridDB Contributor License Agreement(CLA_rev1.1.pdf).
    By using the GitHub pull request function, you shall be deemed to have agreed to GridDB Contributor License Agreement.

# License
  Copyright (c) 2020 Toshiba Digital Solutions Corporation.  
  This plugin for GridDB is licensed under Apache License, version 2.0.  
