(function dsbuilder(attr) {
     var urlBuilder = "jdbc:gs:///" 
      + attr["v-vendor2"]
      + "/" + attr["v-vendor3"]
      + "?notificationMember=" + attr[connectionHelper.attributeServer]
      + "&applicationName=Tableau&loginTimeout=10";

    return [urlBuilder];
})
