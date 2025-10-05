import { setup as setupRules } from "./handlers/rules/setup";
import { setup as setupRecurring } from "./handlers/recurring/setup";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

setupRules();
setupRecurring();
