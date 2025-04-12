import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class Post {
  final File image;
  final String caption;
  final DateTime timestamp;

  Post({required this.image, required this.caption, required this.timestamp});
}

class ImageUploadScreen extends StatefulWidget {
  @override
  _ImageUploadScreenState createState() => _ImageUploadScreenState();
}

class _ImageUploadScreenState extends State<ImageUploadScreen> {
  final List<Post> _posts = [];
  final ImagePicker _picker = ImagePicker();
  final TextEditingController _captionController = TextEditingController();

  Future<void> _pickImage() async {
    final XFile? imageFile = await _picker.pickImage(source: ImageSource.gallery);
    if (imageFile != null) {
      setState(() {
        _posts.add(Post(
          image: File(imageFile.path),
          caption: _captionController.text,
          timestamp: DateTime.now(),
        ));
        _captionController.clear();
      });
    }
  }

  Widget _buildCard({
    required File image,
    required String caption,
    required DateTime timestamp,
    required Function onTap,
  }) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8.0),
      child: InkWell(
        onTap: () => onTap(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 20,
                    backgroundImage: AssetImage('assets/images/default_profile.jpg'),
                  ),
                  SizedBox(width: 8.0),
                  Text('User Name', style: TextStyle(fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            Image.file(image),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(caption, style: TextStyle(fontWeight: FontWeight.bold)),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Text(
                'Posted ${_getRelativeTime(timestamp)}',
                style: TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Icon(Icons.thumb_up, size: 20, color: Colors.grey),
                  SizedBox(width: 8.0),
                  Text('Like', style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getRelativeTime(DateTime timestamp) {
    final duration = DateTime.now().difference(timestamp);
    if (duration.inSeconds < 60) {
      return '${duration.inSeconds}s ago';
    } else if (duration.inMinutes < 60) {
      return '${duration.inMinutes}m ago';
    } else if (duration.inHours < 24) {
      return '${duration.inHours}h ago';
    } else {
      return '${duration.inDays}d ago';
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Social Media Demo')),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _captionController,
                    decoration: InputDecoration(hintText: 'Enter caption...'),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.add_a_photo),
                  onPressed: _pickImage,
                ),
              ],
            ),
            Expanded(
              child: ListView.builder(
                itemCount: _posts.length,
                itemBuilder: (context, index) {
                  final post = _posts[index];
                  return _buildCard(
                    image: post.image,
                    caption: post.caption,
                    timestamp: post.timestamp,
                    onTap: () => _showSnackBar('Post tapped!'),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
