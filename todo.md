## TODOS:

- short term
    - make RecipePaper handle immutable - done
    - Fix gross errors in RecipePaper when partial data
    - Have AddFlavorForm pull manufacturers from database
    - Map Flavor return to flavorItem in db call
    - use RecipeAdd to build out - done
    - have RecipeView do pre-query
    - abstract out RecipeAdd
    - Don't bother doing sanitation
    - have RecipeAdd save view crud
        - on save, do toast errors and highlight fields
    - RecipeAdd 
      - nicotine settings on edit, put into `<ExpansionPanel>`
          - https://material-ui-next.com/demos/expansion-panels/
      - error handling on recipe flavorchange / recipeitem change
    - AddFlavorForm
       - Add in pg/vg ratio of flavor
       - Use `<ExpansionPanel>`
       - default to 100
    - RecipePaper absrtact out logic
        - rebuild ui
      - map stub out existing logic
      - save
    - re-evaluate
       
- long term
    - Build out details of saved recipes
    - Allow recipes to be edited
    - Allow for PG / VG set of flavors
    - Allow recipes to be cloned
    - Add comments to recipe
    - Add in steep time to recipe
    - Abstract out Flavor pickers
    - Make flavor picker handle typeahead
    - When custom type, not match,
        - add checkbox, or state change that is custom, and no flavor match
        - figure out graphQL to not fail? or, store empty as empty object.
        - Need '0' seed
    - "Make a batch" - Save recipe to batch, with timer or countdown until ready?
        - Add notes to batch
        - Remove/Smoke batch


