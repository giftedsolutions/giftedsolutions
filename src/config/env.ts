/**
 * Environment Configuration
 * 
 * Centralizes environment variables with validation
 * Follows 12-Factor App principle: Config stored in environment
 */

class EnvironmentConfig {
  private static instance: EnvironmentConfig;

  public readonly supabaseUrl: string;
  public readonly supabaseAnonKey: string;
  public readonly whatsappNumber: string;
  public readonly businessName: string;
  public readonly businessLocation: string;
  
  // Firebase configuration
  public readonly firebaseApiKey: string;
  public readonly firebaseAuthDomain: string;
  public readonly firebaseProjectId: string;
  public readonly firebaseStorageBucket: string;
  public readonly firebaseMessagingSenderId: string;
  public readonly firebaseAppId: string;
  public readonly adminEmail: string;

  private constructor() {
    // Supabase configuration (optional - will use placeholder if not set)
    this.supabaseUrl = this.getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://gfflwmddooynaexotjtn.supabase.co');
    this.supabaseAnonKey = this.getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmx3bWRkb295bmFleG90anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDQxNTYsImV4cCI6MjA3NTQyMDE1Nn0.J7rGoFoW5yFZ60lf9rBtbAj9BzURx8siDEobFgmNt8M');
    
    // Firebase configuration with defaults
    this.firebaseApiKey = this.getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', 'AIzaSyBh04GVONeNfgvK5uR_8U9wDJ5oy2QqhiQ');
    this.firebaseAuthDomain = this.getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'giftedsolutions-53124.firebaseapp.com');
    this.firebaseProjectId = this.getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'giftedsolutions-53124');
    this.firebaseStorageBucket = this.getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'giftedsolutions-53124.firebasestorage.app');
    this.firebaseMessagingSenderId = this.getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '708765156733');
    this.firebaseAppId = this.getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', '1:708765156733:web:3a830c02e784575c6a7814');
    this.adminEmail = this.getEnvVar('NEXT_PUBLIC_ADMIN_EMAIL', 'admin@giftedsolutions.com');
    
    // Business configuration with defaults
    this.whatsappNumber = this.getEnvVar('NEXT_PUBLIC_WHATSAPP_NUMBER', '260779421717');
    this.businessName = this.getEnvVar('NEXT_PUBLIC_BUSINESS_NAME', 'Gifted Solutions');
    this.businessLocation = this.getEnvVar(
      'NEXT_PUBLIC_BUSINESS_LOCATION',
      'Lusaka, Chalala near Information and Communications University'
    );
  }

  /**
   * Get environment variable with validation
   * @throws Error if required variable is missing
   */
  private getEnvVar(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    
    if (!value) {
      throw new Error(
        `Missing required environment variable: ${key}. ` +
        `Please check your .env file or environment configuration.`
      );
    }
    
    return value;
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }
}

export const env = EnvironmentConfig.getInstance();

