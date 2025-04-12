import pygame
import time
import textwrap

def play_audio_with_subtitles(audio_path, full_text):
    pygame.init()
    pygame.mixer.init()
    pygame.mixer.music.load(audio_path)
    pygame.mixer.music.play()

    screen = pygame.display.set_mode((1000, 300))
    pygame.display.set_caption("Story Narrator Subtitles")
    font = pygame.font.SysFont("Arial", 36)
    white = (255, 255, 255)
    black = (0, 0, 0)

    # Split text into lines
    wrapped_lines = textwrap.wrap(full_text, width=60)  # 60 chars per line
    num_lines = len(wrapped_lines)
    duration = pygame.mixer.Sound(audio_path).get_length()
    delay_per_line = duration / num_lines

    running = True
    idx = 0

    while running and idx < len(wrapped_lines):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill(black)
        line = wrapped_lines[idx]
        rendered = font.render(line, True, white)
        screen.blit(rendered, (screen.get_width() // 2 - rendered.get_width() // 2, 130))
        pygame.display.flip()

        time.sleep(delay_per_line)
        idx += 1

    pygame.quit()
