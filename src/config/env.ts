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
    this.supabaseUrl = this.getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://placeholder.supabase.co');
    this.supabaseAnonKey = this.getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'placeholder-key');
    
    // Firebase configuration
    this.firebaseApiKey = this.getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY');
    this.firebaseAuthDomain = this.getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    this.firebaseProjectId = this.getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    this.firebaseStorageBucket = this.getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
    this.firebaseMessagingSenderId = this.getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
    this.firebaseAppId = this.getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID');
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

