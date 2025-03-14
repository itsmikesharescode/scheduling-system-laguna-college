import type { Student, Teacher } from './aux.types';
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      assigned_students_tb: {
        Row: {
          created_at: string;
          id: number;
          student_id: string;
          teacher_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          student_id: string;
          teacher_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          student_id?: string;
          teacher_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'assigned_students_tb_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students_tb';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'assigned_students_tb_teacher_id_fkey';
            columns: ['teacher_id'];
            isOneToOne: false;
            referencedRelation: 'teachers_tb';
            referencedColumns: ['user_id'];
          }
        ];
      };
      reminders_tb: {
        Row: {
          created_at: string;
          id: number;
          time: string;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          time: string;
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          time?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      reports_tb: {
        Row: {
          created_at: string;
          id: number;
          message: string;
          reference_id: string;
          reporter_id: string;
          status: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message: string;
          reference_id: string;
          reporter_id: string;
          status: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string;
          reference_id?: string;
          reporter_id?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reports_tb_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users_tb';
            referencedColumns: ['user_id'];
          }
        ];
      };
      roles_tb: {
        Row: {
          created_at: string;
          role: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          role: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      students_tb: {
        Row: {
          created_at: string;
          user_id: string;
          user_meta_data: Student;
        };
        Insert: {
          created_at?: string;
          user_id: string;
          user_meta_data: Student;
        };
        Update: {
          created_at?: string;
          user_id?: string;
          user_meta_data?: Student;
        };
        Relationships: [
          {
            foreignKeyName: 'students_tb_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users_tb';
            referencedColumns: ['user_id'];
          }
        ];
      };
      teachers_tb: {
        Row: {
          created_at: string;
          user_id: string;
          user_meta_data: Teacher;
        };
        Insert: {
          created_at?: string;
          user_id: string;
          user_meta_data: Teacher;
        };
        Update: {
          created_at?: string;
          user_id?: string;
          user_meta_data?: Teacher;
        };
        Relationships: [
          {
            foreignKeyName: 'teachers_tb_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users_tb';
            referencedColumns: ['user_id'];
          }
        ];
      };
      users_tb: {
        Row: {
          created_at: string;
          user_id: string;
          user_meta_data: Student | Teacher;
        };
        Insert: {
          created_at?: string;
          user_id: string;
          user_meta_data: Student | Teacher;
        };
        Update: {
          created_at?: string;
          user_id?: string;
          user_meta_data?: Student | Teacher;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      admin_get_assignable_students: {
        Args: {
          teacher_id: string;
        };
        Returns: {
          user_id: string;
          created_at: string;
          user_meta_data: Json;
        }[];
      };
      get_dashboard_counts: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_student: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_teacher: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
