/**
 * FinForge MCP Hub: Central Registry
 * Dynamically orchestrates financial 'Blades' for a unified agent experience.
 */

export class BladeRegistry {
    constructor() {
        this.blades = new Map();
    }

    /**
     * Register a financial blade.
     * @param {string} name - Name of the blade (e.g., 'tax', 'portfolio')
     * @param {Object} blade - The blade module containing tools and logic.
     */
    register(name, blade) {
        console.error(`🔌 Blade Connected: ${name}`);
        this.blades.set(name, blade);
    }

    /**
     * Get all tools across all registered blades.
     */
    getAllTools() {
        let allTools = [];
        for (const [name, blade] of this.blades) {
            const tools = blade.tools.map(t => ({
                ...t,
                name: `${name}_${t.name}` // Namespace tools to prevent collisions
            }));
            allTools = allTools.concat(tools);
        }
        return allTools;
    }

    /**
     * Route a tool call to the correct blade.
     */
    async handleCall(toolName, args) {
        const [bladeName, ...rest] = toolName.split('_');
        const actualToolName = rest.join('_');
        
        const blade = this.blades.get(bladeName);
        if (!blade) throw new Error(`Unknown blade: ${bladeName}`);
        
        return await blade.execute(actualToolName, args);
    }
}
