import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { supabase } from '@/lib/supabase';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headers = req.headers;

  // Get the Svix headers for verification
  const svixId = headers.get('svix-id');
  const svixTimestamp = headers.get('svix-timestamp');
  const svixSignature = headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error occurred -- missing svix headers', { status: 400 });
  }

  // Create a new Svix instance with your secret
  const wh = new Webhook(webhookSecret);

  let evt: any;

  try {
    // Verify the webhook payload
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred during verification', { status: 400 });
  }

  // Handle the event
  const { type, data } = evt;

  try {
    switch (type) {
      case 'user.created':
        await handleUserCreated(data);
        break;
      case 'user.updated':
        await handleUserUpdated(data);
        break;
      case 'user.deleted':
        await handleUserDeleted(data);
        break;
      default:
        console.log(`Unhandled event type: ${type}`);
    }

    return NextResponse.json({ message: 'Webhook received' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
}

async function handleUserCreated(userData: any) {
  const { id, username, first_name, last_name, image_url, email_addresses } = userData;

  // Get primary email
  const primaryEmail = email_addresses?.find((email: any) => email.id === userData.primary_email_address_id)?.email_address;

  const displayName = [first_name, last_name].filter(Boolean).join(' ') || username || 'User';

  const profileData = {
    id,
    username: username || `user_${id.slice(-8)}`,
    display_name: displayName,
    avatar_url: image_url,
    bio: null,
    location: null,
    website: null,
    banner_url: null,
    followers_count: 0,
    following_count: 0,
    tweets_count: 0,
    verified: false,
  };

  const { error } = await supabase
    .from('profiles')
    .insert(profileData);

  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }

  console.log(`Created profile for user: ${username || id}`);
}

async function handleUserUpdated(userData: any) {
  const { id, username, first_name, last_name, image_url, email_addresses } = userData;

  const displayName = [first_name, last_name].filter(Boolean).join(' ') || username || 'User';

  const updateData = {
    username: username,
    display_name: displayName,
    avatar_url: image_url,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }

  console.log(`Updated profile for user: ${username || id}`);
}

async function handleUserDeleted(userData: any) {
  const { id } = userData;

  // Delete the user's profile and related data
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }

  console.log(`Deleted profile for user: ${id}`);
}