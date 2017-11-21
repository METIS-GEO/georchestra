Ext.namespace("GEOR.Addons");

GEOR.Addons.sensor = Ext.extend(GEOR.Addons.Base, {
    win: null,
    addressField: null,
    layer: null,

    /**
     * Method: init
     *
     * Parameters:
     * record - {Ext.data.record} a record with the addon parameters
     */
    init: function(record) {

        // create layer : container of geometry to display adress selected
        this.layer = new OpenLayers.Layer.Vector("__georchestra_foi", {
            displayInLayerSwitcher: false,
            /*styleMap: new OpenLayers.StyleMap({
                "default": {
                    
                }
            })*/
        });

        this.win = new Ext.Window({
            title: OpenLayers.i18n("sensor.window_title"),
            constrainHeader: true,
            width: 312,
            closable: true,
            closeAction: "hide",
            resizable: false,
            border: false,
            cls: "sensor client tools",
            //items: [],
            listeners: {
                "hide": function() {
                    this.map.removeLayer(this.layer);
                    //this.item && this.item.setChecked(false);
                    this.components && this.components.toggle(false);
                },
                "show": function() {
                    this.map.addLayer(this.layer);
                },
                scope: this
            }
        });

        if (this.target) {
            // create a button to be inserted in toolbar:
            this.components = this.target.insertButton(this.position, {
                xtype: "button",
                tooltip: OpenLayers.i18n("sensor.tooltip.btn"),
                iconCls: "addon-sensor",
                handler: this.showWindow,
                scope: this
            });
            this.target.doLayout();
        } else {
            // create a menu item for the "tools" menu:
            this.item = new Ext.menu.CheckItem({
                text: OpenLayers.i18n("sensor.item.txt"),
                qtip: OpenLayers.i18n("sensor.item.qtip"),,
                iconCls: "addon-sensor",
                handler: this.showWindow,
                scope: this
            });
        }
    },

    /**
     * Method: showWindow
     */
    showWindow: function() {
        if(!this.win.isVisible()){
            this.win.show();
        }
    },


    /**
     * Method: destroy
     * Called by GEOR_tools when deselecting this addon
     */
    destroy: function() {
        if(this.win){
            this.win.destroy();    
        }
        if(this.layer){
            this.layer.destroyFeatures();    
        }

        GEOR.Addons.Base.prototype.destroy.call(this);
    }
});