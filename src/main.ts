import { setup as setupRules } from "./handlers/rules/setup";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

setupRules();
