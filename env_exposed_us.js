/* eslint quotes: 0 */

window.onWidgetsLoaded = function() {
  var layerSelector = cdb.$( cdb.$('#tpl-layer-selector').html() );

  layerSelector.insertBefore(cdb.$('.CDB-Widget').eq(0));

  cdb.$('.js-layerSelect').find('option[value="'+ window.tplSelected +'"]').attr('selected', true);

  layerSelector.on('change', function (e) {
    var tpl = e.target.value;
    window.tplSelected = tpl;
    window.pageConfig.layerIds = [{layerId: "us_census", tpl: tpl},"env","cities_labels","separators"];
    window.loadDashboard();
  })
}

window.pageConfig = {
  layerIds: ["us_census","env","cities_labels","separators"],
  zoom: 8,
  center: [7, 5],
  basemap_opacity: 0,
  tooltip: {
    interactivity: "cartodb_id,name",
    fields: [
      {
        "name": "name",
        "title": true,
        "position": 0
      }
    ]
  },
  widgets: [
    {
      "id": "sum_total_pop",
      "type": "formula",
      "title": "Population At Risk",
      "layer_id": "us_census",
      "options": {
        "column": "total_pop",
        "operation": "sum"
      }
    },

    {
      "id": "sum_women",
      "type": "formula",
      "title": "Women of Child Bearing Age (total)",
      "layer_id": "us_census",
      "options": {
        "column": "women_childbearing",
        "operation": "sum"
      }
    },
    {
      "id": "sum_poverty",
      "type": "formula",
      "title": "Population living below poverty line (total)",
      "layer_id": "us_census",
      "options": {
        "column": "income_below_poverty_level",
        "operation": "sum"
      }
    },

    {
      "id": "ethnicity",
      "type": "category",
      "title": "At risk by racial demographic",
      "layer_id": "us_census",
      "options": {
        "type": "aggregation",
        "column": "largest_ethnic_group",
        "aggregation": "count"
      }
    },
    {
      "type": "histogram",
      "title": "Women of Child Bearing Age (ratio)",
      "layer_id": "us_census",
      "options": {
          "type": "histogram",
          "column": "women_childbearing_ratio",
          "sync": true
      }
    },
    {
      "type": "histogram",
      "title": "Population living below poverty line (ratio)",
      "layer_id": "us_census",
      "options": {
        "type": "histogram",
        "column": "income_below_poverty_level_ratio",
        "sync": true
      }
    },

  ]
}
