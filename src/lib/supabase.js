import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cqamsscdiabwffiawiqv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYW1zc2NkaWFid2ZmaWF3aXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNDQ0ODMsImV4cCI6MjEwOTYyMDQ4M30.f25PMqs5XvnYP7o7W3rF2dkkAlqQ7cxFXWboKY_rHJI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Save Contact Inquiries into Supabase
 */
export async function submitContactInquiry({ name, email, phone, service, budget, message }) {
  try {
    const { error } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name: (name || '').trim(),
          email: (email || '').trim(),
          phone: (phone || '').trim(),
          service: service || null,
          budget: budget || null,
          message: (message || '').trim(),
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase contact_inquiries error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting contact inquiry:', err);
    return { success: false, error: err };
  }
}

/**
 * Save Quote Requests / Package Builder Inquiries into Supabase
 */
export async function submitQuoteRequest({ clientName, clientPhone, selectedServices, timeline, estimatedTotal }) {
  try {
    const { error } = await supabase
      .from('quote_requests')
      .insert([
        {
          client_name: (clientName || '').trim(),
          client_phone: (clientPhone || '').trim(),
          selected_services: selectedServices || [],
          timeline: timeline || null,
          estimated_total: Number(estimatedTotal) || 0,
          currency: 'USD',
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase quote_requests error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting quote request:', err);
    return { success: false, error: err };
  }
}

/**
 * Save Service Booking / Quick Inquiries into Supabase
 */
export async function submitServiceBooking({ serviceId, serviceTitle, clientName, clientEmail, clientPhone, notes }) {
  try {
    const { error } = await supabase
      .from('service_bookings')
      .insert([
        {
          service_id: serviceId || null,
          service_title: serviceTitle || null,
          client_name: (clientName || '').trim() || null,
          client_email: (clientEmail || '').trim() || null,
          client_phone: (clientPhone || '').trim() || null,
          notes: (notes || '').trim() || null,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase service_bookings error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting service booking:', err);
    return { success: false, error: err };
  }
}
