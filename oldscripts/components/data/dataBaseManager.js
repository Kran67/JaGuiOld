(function () {
    //#region DataBaseManager
    var DataBaseManager = $j.classes.Component.extend("DataSource", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                //#endregion
            }
        },
        //#region Setters
        //#endregion
        //#region Methods
        destroy: function () {
        }
        //#endregion
    });
    Object.seal(DataBaseManager);
    $j.classes.register($j.types.categories.NONVISUAL, DataBaseManager);
    //#endregion
})();

/*
<databases>
  <database name="">
    <table name="">
      <constraints>
      </constraints>
      <fields>
        <field name="" dataType="string/integer/float/date/blob/boolean/autoinc" allownull="" />
      </fields>
      <records>
        <record>
          <fieldName value />
          <fieldName value />
          <fieldName value />
          <fieldName value />
          <fieldName value />
        </record>
      </records>
    </table>
    <views>
      <view name="">
      </view>
    </views>
  </database>
</databases>

DataBaseManager.load(xmlText);
DataBaseManager.createDb(dbName);
DataBaseManager.dropDb(dbName);
DataBaseManager.close(dbName);
var db=DataBaseManager.open(dbName);
var table=db.getTable(tableName);
var query=table.select(["fieldName",...,"fieldName"]).where("").distinct().orderBy();
table.insert({"fields":[{"fieldName":"value",...,"fieldName":"value"}]});
table.delete({"conditions":{"fieldName":"value",...,"fieldName":"value"}});
table.update();
table.truncate();

db.createTable(tableName,{"fields":{"fieldName":"","dataType":""}});
db.dropTable(tableName);
db.alterTable(tableName,{});
db.createView(viewName,query);
var view=db.getView(viewName);
db.query([{"tableName":"","fields":[]]).where();

records.
*/